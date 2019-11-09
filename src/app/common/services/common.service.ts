import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { gv, ClientesSubscribe } from '../constants';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Injectable()

export class CommonService {

    constructor(public db: AngularFirestore,
        public alertController: AlertController,
        private menuCtrl: MenuController,
        public router: Router,
        private toastController: ToastController,
        public localStorage: Storage) { }

    //Collaborator
    async EliminateCollaboratorAlert(Usuario, key_user) {
        const alert = await this.alertController.create({
            mode: 'ios',
            header: "Eliminar usuario",
            message: "¿Eliminar a " + Usuario[gv.nombre] + "?",
            buttons: [
                {
                    text: "Cancelar",
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Confirmar',
                    handler: (data: string) => {
                        console.log("Data collaborator")
                        this.EliminateCollaborator(key_user);
                    }
                }
            ]
        });
        await alert.present();
    }
    NewCollaborator(Name: string, roll: string, Password: string, mail: string) {
        return new Promise<any>((resolve, reject) => {

            this.db.collection(gv.FB_Usuarios).add({
                [gv.nombre]: Name,
                [gv.roll]: roll,
                [gv.mail]: mail,
                [gv.password]: Password,
                [gv.organizacion]: 'MF-Financiera'
            }).then((reponse) => {
                this.Toast('Usuario agregado', 2000);
                resolve(true);
            }).catch((error) => {
                this.Toast('Error al agregar usuario', 2000);
                reject(false);
            });
        });
    }
    UpdateCollaborator(Name: string, roll: string, Password: string, key_collaborator: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.collection(gv.FB_Usuarios).doc(key_collaborator).update({
                [gv.nombre]: Name,
                [gv.roll]: roll,
                [gv.password]: Password
            }).then((reponse) => {

                resolve(reponse);
            }).catch((error) => {

                reject(error);
            });
        });
    }
    EliminateCollaborator(key_collaborator: string) {
        return new Promise<any>((resolve, reject) => {

            this.db.collection(gv.FB_Usuarios).doc(key_collaborator).delete()
                .then((reponse) => {

                    this.Toast("Usuario eliminado", 2000);
                    resolve(true);

                }).catch((error) => {
                    this.Toast("Error al eliminar al usuario", 2000);
                    reject(false);

                });
        });
    }

    CrearCollaborador(Name: string, roll: string, Password: string, mail: string, organizacion: string) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(mail, Password).then((data: any) => {
                this.db.collection(gv.FB_Usuarios).doc(data.user.uid).set({
                    [gv.nombre]: Name,
                    [gv.roll]: roll,
                    [gv.mail]: mail,
                    [gv.organizacion]: organizacion
                }).then((res) => {
                    console.log("res")
                    console.log(res)

                    if (!firebase.auth().currentUser.emailVerified) {
                        console.log("send mail")
                        firebase.auth().currentUser.sendEmailVerification().then((mail_veri_res) => {
                            console.log("mail sent")
                            console.log(mail_veri_res);
                            resolve(res);
                        }).catch((err) => {
                            console.log("err at mail sent")
                            reject(err);
                        });
                    }
                });
            }).catch((err) => {
                console.log("err")
                console.log(err)
                reject(err);
            });
        });
    }

    //CLIENTES
    NuevoCliente(nombre: string, direccion: string, telefono: string, curp: string, fecha_nacimiento: string, sexo: string,
        nombre_aval: string, direccion_aval: string, telefono_aval: string, curp_aval: string, identificador: string) {
        return new Promise<any>((resolve, reject) => {
            let Fecha = new Date(fecha_nacimiento);

            this.db.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion]).collection(gv.FB_Clientes).add({
                [gv.nombre]: nombre,
                [gv.direccion]: direccion,
                [gv.telefono]: telefono,
                [gv.curp]: curp,
                [gv.nacimiento]: this.YYMMDDFormatFromDate(Fecha),
                [gv.sexo]: sexo,
                [gv.identificador]: identificador,
                [gv.aval]: {
                    [gv.nombre]: nombre_aval,
                    [gv.direccion]: direccion_aval,
                    [gv.telefono]: telefono_aval,
                    [gv.curp]: curp_aval
                }
            }).then((reponse) => {
                this.Toast('Cliente agregado', 2000);
                resolve(true);
            }).catch((error) => {
                this.Toast('Error al agregar cliente', 2000);
                reject(false);
            });
        });
    }

    //CREDITOS
    RegistratCredito(total_pagos: number, nombre: string, Key_Creador: string, credito: number,
        fecha, periodo: string, pago: number, identificador: string, efectivo: number,
        total_credito: number, deposito: string, hora: string, ArrGarantias) {
        return new Promise<any>((resolve, reject) => {

            var CreditBatch = this.db.firestore.batch();
            let date_credit = new Date(fecha)

            let hoy = new Date();
            let key_primer_pago = Key_Creador +
                this.GetRef(hoy, this.AgregarCero(hoy.getHours()) + '' + this.AgregarCero(hoy.getMinutes()));

            for (let x = 0; x < total_pagos; x++) {
                if (x === 0) {
                    var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(key_primer_pago);

                    CreditBatch.set(PaymentRef,
                        this.PrimerPago(nombre, x + 1, Key_Creador, efectivo, credito, identificador, pago, gv.status_proximo,
                            this.GetRef(date_credit, hora), total_credito, deposito, key_primer_pago, ArrGarantias));
                            
                            console.log(this.PrimerPago(nombre, x + 1, Key_Creador, efectivo, credito, identificador, pago, gv.status_proximo,
                                this.GetRef(date_credit, hora), total_credito, deposito, key_primer_pago, ArrGarantias))
                } else
                    if (x === total_pagos - 1) {
                        var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                            .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                        CreditBatch.set(PaymentRef,
                            this.UltimoPago(nombre, x + 1, Key_Creador, total_pagos, identificador, pago, gv.status_proximo,
                                this.GetRef(date_credit, hora), deposito, key_primer_pago));
                    } else {
                        var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                            .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                        CreditBatch.set(PaymentRef,
                            this.NormalPago(nombre, x + 1, Key_Creador, identificador, pago, gv.status_proximo,
                                this.GetRef(date_credit, hora), deposito, key_primer_pago));
                    }
                date_credit = this.GetFechaPorPeriodo(date_credit, periodo);
            }

            CreditBatch.commit().then(response => {
                console.log("Done Credit Batch");
                resolve(true);
            });
        });
    }
    GetFechaPorPeriodo(date, WeekOrDay: string) {
        if (WeekOrDay === gv.semanal) {
            date.setDate(date.getDate() + 7);
        } else
            if (WeekOrDay === gv.diario) {
                date.setDate(date.getDate() + 1);
            }
            else
                if (WeekOrDay === gv.mensual) {
                    date.setMonth(date.getMonth() + 1);
                }
                else
                    if (WeekOrDay === gv.quincenal) {
                        date.setDate(date.getDate() + 14);
                    }

        return date;
    }
    PrimerPago(nombre: string, num_pago: number, key_creador: string, efectivo: number, credito: number, identificador: string,
        pago: number, status: string, timeref: number, total_credito: number, deposito: string, key_primer_pago: string, ArrGarantias) {
        return {
            [gv.total_credito]: Number(total_credito),

            [gv.efectivo]: Number(efectivo),
            [gv.credito]: Number(credito),

            [gv.nombre]: nombre,
            [gv.garantias]: ArrGarantias,
            [gv.num_pago]: Number(num_pago),

            [gv.key_creador]: key_creador,
            [gv.identificador]: identificador.toUpperCase(),
            [gv.key_primer_pago]: key_primer_pago,

            [gv.pago]: Number(pago),
            [gv.status]: status,
            [gv.fecha]: Number(timeref),
            [gv.deposito]: deposito
        }
    }
    UltimoPago(nombre: string, num_pago: number, key_creador: string, total_pagos: number, identificador: string, pago: number, status: string,
        timeref: number, deposito: string, key_primer_pago: string) {
        return {
            [gv.total_pagos]: Number(total_pagos),

            [gv.nombre]: nombre,
            [gv.num_pago]: Number(num_pago),
            [gv.key_creador]: key_creador,
            [gv.pago]: Number(pago),
            [gv.status]: status,
            [gv.identificador]: identificador.toUpperCase(),
            [gv.fecha]: Number(timeref),
            [gv.deposito]: deposito,
            [gv.key_primer_pago]: key_primer_pago,
        }
    }
    NormalPago(nombre: string, num_pago: number, key_creador: string, identificador: string, pago: number,
        status: string, timeref: number, deposito: string, key_primer_pago: string) {
        return {
            [gv.nombre]: nombre,
            [gv.num_pago]: Number(num_pago),
            [gv.key_creador]: key_creador,
            [gv.identificador]: identificador.toUpperCase(),
            [gv.pago]: Number(pago),
            [gv.status]: status,
            [gv.fecha]: Number(timeref),
            [gv.deposito]: deposito,
            [gv.key_primer_pago]: key_primer_pago,

        }
    }
    GetRef(date: Date, Hour: string): number {
        return Number(date.getFullYear().toString().substr(-2) + this.AgregarCero(date.getMonth() + 1) + this.AgregarCero(date.getDate()) + Hour);
    }

    //MODIFICAR CREDITO
    PagoCredito(Proximo, PrimerPago, ArrPagos, multa: number, pay: number, name: string) {
        return new Promise<any>((resolve, reject) => {
            let today = new Date();

            var PaymentBatch = this.db.firestore.batch();

            if (multa !== 0) {
                var FirstPayRef = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                    .collection(gv.FB_Pagos).doc(PrimerPago[gv.key]);

                PaymentBatch.update(FirstPayRef, {
                    [gv.total_credito]: Number(PrimerPago[gv.total_credito] + multa),
                });
            }

            if (Proximo[gv.pago] > pay) {
                console.log("Pago menor que credito")

                var Parcial_Pay_Ref = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                    .collection(gv.FB_Pagos).doc(Proximo['key']);
                PaymentBatch.update(Parcial_Pay_Ref, {
                    [gv.status]: gv.status_pagado,
                    [gv.cantidad_pagado]: Number(pay + multa),
                    [gv.pago]: Number(pay + multa),
                    [gv.multa]: Number(multa),
                    [gv.dia_cobro]: this.GetRef(today, this.AgregarCero(today.getHours()) + '' + this.AgregarCero(today.getMinutes())),
                    [gv.cobrado_por]: name
                });

                //Add another payment with the remanent of the last payment
                if (Proximo[gv.pago] - pay !== 0) {
                    console.log("Remanente del pago")
                    var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                        .collection(gv.FB_Pagos).doc();

                    let ParcialPay = this.NormalPago(PrimerPago[gv.nombre], Proximo[gv.num_pago] + .1, PrimerPago[gv.key_creador],
                        PrimerPago[gv.identificador], Proximo[gv.pago] - pay, gv.status_vencido,
                        Proximo[gv.fecha], PrimerPago[gv.deposito], PrimerPago[gv.key]);

                    PaymentBatch.set(PaymentRef, ParcialPay);
                }
            } else
                if (Proximo[gv.pago] < pay) {
                    console.log("Pay bigger than payment");
                    //Set this payment as paid
                    var Total_Pay_Ref = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                        .collection(gv.FB_Pagos).doc(Proximo['key']);
                    PaymentBatch.update(Total_Pay_Ref, {
                        [gv.status]: gv.status_pagado,
                        [gv.cantidad_pagado]: Number(Proximo[gv.pago] + multa),
                        [gv.pago]: Number(Proximo[gv.pago] + multa),
                        [gv.multa]: Number(multa),
                        [gv.cobrado_por]: name,
                        [gv.dia_cobro]: this.GetRef(today, this.AgregarCero(today.getHours()) + '' + this.AgregarCero(today.getMinutes()))
                    });

                    pay -= Proximo[gv.pago];

                    let NextPay = [];
                    NextPay = ArrPagos.filter(pago => {
                        return pago[gv.status] === gv.status_proximo ||
                            pago[gv.status] === gv.status_vencido;
                    });
                    NextPay.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

                    for (let x = 1; x < NextPay.length; x++) {
                        if (pay >= NextPay[x][gv.pago]) {

                            //Set payment as fully paid as paid is greater than payment
                            var Total_Pay_Ref = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                                .collection(gv.FB_Pagos).doc(NextPay[x]['key']);
                            PaymentBatch.update(Total_Pay_Ref, {
                                [gv.status]: gv.status_pagado,
                                [gv.cantidad_pagado]: NextPay[x][gv.pago],
                                [gv.cobrado_por]: name,
                                [gv.dia_cobro]: this.GetRef(today, this.AgregarCero(today.getHours()) + '' + this.AgregarCero(today.getMinutes()))
                            });

                            pay -= NextPay[x][gv.pago];
                        } else
                            if (pay !== 0) {
                                //This payment was half paid
                                var Total_Pay_Ref = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                                    .collection(gv.FB_Pagos).doc(NextPay[x]['key']);
                                PaymentBatch.update(Total_Pay_Ref, {
                                    [gv.cantidad_pagado]: Number(pay),
                                    [gv.pago]: Number(pay),
                                    [gv.cobrado_por]: name,
                                    [gv.status]: gv.status_pagado,
                                    [gv.dia_cobro]: this.GetRef(today, this.AgregarCero(today.getHours()) + '' + this.AgregarCero(today.getMinutes()))
                                });

                                //Add another half paid payment
                                var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                                    .collection(gv.FB_Pagos).doc();
                                PaymentBatch.set(PaymentRef, this.NormalPago(PrimerPago[gv.nombre], NextPay[x][gv.num_pago] + .1,
                                    PrimerPago[gv.key_creador], PrimerPago[gv.identificador], NextPay[x][gv.pago] - pay,
                                    gv.status_proximo, NextPay[x][gv.fecha], NextPay[x][gv.deposito], PrimerPago[gv.key]));
                                break;
                            }
                    }
                } else
                    if (Proximo[gv.pago] === pay) {
                        console.log("Pay equal to payment");

                        //Change status to payment
                        var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                            .collection(gv.FB_Pagos).doc(Proximo[gv.key]);
                        PaymentBatch.update(PaymentRef, {
                            [gv.status]: gv.status_pagado,
                            [gv.dia_cobro]: this.GetRef(today, this.AgregarCero(today.getHours()) + '' + this.AgregarCero(today.getMinutes())),
                            [gv.cantidad_pagado]: Number(Proximo[gv.pago] + multa),
                            [gv.pago]: Number(Proximo[gv.pago] + multa),
                            [gv.multa]: Number(multa),
                            [gv.cobrado_por]: name
                        });
                    }


            PaymentBatch.commit().then(response => {
                this.Toast('Pago aplicado', 2000);
                console.log("Done payment Batch")
                resolve(true)
            });

        })
    }
    PosponerPago(Proximo, name: string, fecha: Date, razon: string) {
        return new Promise<any>((resolve, reject) => {

            var PosposeBatch = this.db.firestore.batch();

            //Change date and status to payment
            var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(Proximo[gv.key]);

            PosposeBatch.update(PaymentRef, {
                [gv.status]: gv.status_vencido,
                [gv.fecha]: this.GetRef(fecha, this.AgregarCero(fecha.getHours()) + '' + this.AgregarCero(fecha.getMinutes())),
                [gv.explicacion]: razon,
                [gv.modificado_por]: name
            });

            PosposeBatch.commit().then(response => {
                this.Toast('Pago del dia ' + Proximo[gv.fecha] + ' pospuesto para el dia ' + fecha, 2000);
                console.log("Done payment Batch")
                resolve(true)
            });
        });
    }
    LiquidarCredito(ArrPagos, name: string, pago_perdonado: number, PrimerPago, Proximo) {
        return new Promise<any>((resolve, reject) => {
            let today = new Date();

            var SettleBatch = this.db.firestore.batch();

            //Reduce the amount excused to First payment
            var FirstPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(PrimerPago['key']);

            SettleBatch.update(FirstPaymentRef, {
                [gv.total_credito]: firebase.firestore.FieldValue.increment(- pago_perdonado)
            });

            ArrPagos = ArrPagos.filter(pago => {
                return pago[gv.status] === gv.status_proximo ||
                    pago[gv.status] === gv.status_vencido;
            });
            ArrPagos.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

            let Total_Remaining = 0;

            for (let x = 0; x < ArrPagos.length; x++) {
                Total_Remaining += ArrPagos[x][gv.pago];

                if (ArrPagos[x][gv.status] !== gv.status_pagado && x > 0) {
                    var EliminatedPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(ArrPagos[x]['key']);

                    SettleBatch.delete(EliminatedPaymentRef);
                }
            }

            let LastPayment = this.UltimoPago(Proximo[gv.nombre], Proximo[gv.num_pago], Proximo[gv.key_creador], Proximo[gv.num_pago], 
                Proximo[gv.identificador],Total_Remaining - pago_perdonado, gv.status_pagado, Proximo[gv.fecha], 
                Proximo[gv.deposito], Proximo[gv.key_primer_pago]);

            LastPayment[gv.cantidad_pagado] = Number(Total_Remaining - pago_perdonado);
            LastPayment[gv.cobrado_por] = name;
            LastPayment[gv.dia_cobro] = this.GetRef(today, this.AgregarCero(today.getHours()) + '' + this.AgregarCero(today.getMinutes()));

            var LastPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
            .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(Proximo['key']);

            SettleBatch.update(LastPaymentRef, LastPayment);

            SettleBatch.commit().then(response => {
                console.log("Done Settle Batch")
                resolve(true)
            });
        })
    }
    ReestructurarCredito(Proximo, pago: number, periodo: string, ArrPagos, fecha) {
        return new Promise<any>((resolve, reject) => {
            if (periodo === '') {
                periodo = Proximo[gv.periodo]
            }
            var ReStructure = this.db.firestore.batch();

            let TotalPay = 0;
            ArrPagos = ArrPagos.filter(pago => {
                return pago[gv.status] === gv.status_vencido ||
                    pago[gv.status] === gv.status_proximo;
            });4

            for (let x = 0; x < ArrPagos.length; x++) {
                //Count the amount left to pay
                TotalPay += ArrPagos[x][gv.pago];
                //Erase remaining payments
                var UserRef = this.db.firestore.collection(gv.FB_Organizaciones)
                    .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(ArrPagos[x]['key']);

                ReStructure.delete(UserRef);
            }
            

            let Num_payments = Math.ceil(TotalPay / pago);
            let date_credit = new Date(fecha);

            for (let y = 0; y < Num_payments; y++) {
                //If there is remanent set it as payment
                if (TotalPay <= pago) {
                    pago = TotalPay;
                }

                if (y !== Num_payments - 1) {
                    //Set nremaining normal payments
                    var NormalPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                    ReStructure.set(NormalPaymentRef,
                        this.NormalPago(Proximo[gv.nombre], Math.ceil(ArrPagos[0][gv.num_pago]) + y, Proximo[gv.key_creador],
                        Proximo[gv.identificador], pago, gv.status_proximo, 
                        this.GetRef(date_credit, this.AgregarCero(date_credit.getHours()) + '' + this.AgregarCero(date_credit.getMinutes())),
                        Proximo[gv.deposito], Proximo[gv.key_primer_pago]));

                } else {
                    //Set last payment of re estructure
                    var LastPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                    ReStructure.set(LastPaymentRef,
                        this.UltimoPago(Proximo[gv.nombre], Math.ceil(ArrPagos[0][gv.num_pago] + y), Proximo[gv.key_creador], 
                            Num_payments, Proximo[gv.identificador], pago, gv.status_proximo, 
                            this.GetRef(date_credit, this.AgregarCero(date_credit.getHours()) + '' + this.AgregarCero(date_credit.getMinutes())),
                            Proximo[gv.deposito], Proximo[gv.key_primer_pago]));
                }

                TotalPay -= pago;
                date_credit = this.GetFechaPorPeriodo(date_credit, periodo);
            }

            ReStructure.commit().then(response => {
                console.log("Done Parcial Batch")
                resolve(true)
            });
        });
    }
    AgregarPagosMulta(ArrPagos, Pagos_Extra: number) {
        return new Promise<any>((resolve, reject) => {

            let today = new Date();
            var PaymentBatch = this.db.firestore.batch();

            //Add total pay to added credit
            var FirstPayRef = this.db.firestore.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(ArrPagos[0]['key']);

            PaymentBatch.update(FirstPayRef, {
                [gv.total_credito]: Number(ArrPagos[0][gv.total_credito] + Pagos_Extra * ArrPagos[ArrPagos.length - 2][gv.pago]),
            });

            //Erase total payments from past last payment
            var PastLastPayment = this.db.firestore.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(ArrPagos[ArrPagos.length - 1]['key']);

            PaymentBatch.update(PastLastPayment, {
                [gv.total_pagos]: firebase.firestore.FieldValue.delete()
            });

            let date_credit = new Date(ArrPagos[ArrPagos.length - 1][gv.fecha]);

            for (let x = 0; x < Pagos_Extra; x++) {
                date_credit = this.GetFechaPorPeriodo(date_credit, ArrPagos[0][gv.periodo]);

                //Set extra normal payments
                if (x !== Pagos_Extra - 1) {
                    var NormalPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                    PaymentBatch.set(NormalPaymentRef,
                        this.NormalPago(ArrPagos[0][gv.nombre], ArrPagos[ArrPagos.length - 1][gv.num_pago] + x + 1, ArrPagos[0][gv.key_creador],
                            ArrPagos[0][gv.identificador], ArrPagos[ArrPagos.length - 2][gv.pago], gv.status_proximo, 
                            this.GetRef(date_credit, this.AgregarCero(date_credit.getHours()) + '' + this.AgregarCero(date_credit.getMinutes())),
                            ArrPagos[0][gv.deposito], ArrPagos[0][gv.key_primer_pago]));

                } else {
                    //Set LastPayment
                    var LastPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                    PaymentBatch.set(LastPaymentRef,
                        this.UltimoPago(ArrPagos[0][gv.nombre], ArrPagos[ArrPagos.length - 1][gv.num_pago] + x + 1, ArrPagos[0][gv.key_creador],
                            ArrPagos[ArrPagos.length - 1][gv.total_pagos] + Pagos_Extra, ArrPagos[0][gv.identificador], ArrPagos[ArrPagos.length - 2][gv.pago],
                            gv.status_proximo, 
                            this.GetRef(date_credit, this.AgregarCero(date_credit.getHours()) + '' + this.AgregarCero(date_credit.getMinutes())),
                            ArrPagos[0][gv.deposito], ArrPagos[0][gv.key_primer_pago]));
                }
            }

            PaymentBatch.commit().then(response => {
                console.log("Done payment Batch")
                resolve(true)
            });
        });
    }
    EliminarCredito(ArrPagos) {
        return new Promise<any>((resolve, reject) => {
            var EliminateCreditBatch = this.db.firestore.batch();

            for (let x = 0; x < ArrPagos.length; x++) {
                var EliminarPagoRef = this.db.firestore.collection(gv.FB_Organizaciones)
                    .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(ArrPagos[x]['key']);

                EliminateCreditBatch.delete(EliminarPagoRef);
            }

            EliminateCreditBatch.commit().then(response => {
                resolve(true)
            });
        })

    }

    async Toast(message: string, duration: number) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            mode: "ios",
            cssClass: "center-toast-text"
        });
        toast.present();
    }
    YYMMDDFormatFromDate(date: Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('/');
    }

    CheckLogin() {
        this.localStorage.get('user').then((val) => {
            if (val) {
                console.log("logged in")
                console.log(val)
                gv.usuario = val;

                this.ListenersClientesPagos();
                this.ListenersColaboradores();

                if (this.router.url === '/login') {
                    this.IrAClientes();
                } else
                    this.EnableSideMenu();
            } else {
                this.IrALogin();
            }
        });
    }

    //IR A PANTALLAS
    IrALogin() {
        this.router.navigateByUrl('login');
    }
    IrAClientes() {
        this.router.navigateByUrl('clients');
    }

    Clientessubscribe;
    PagosSubscribe;
    ListenersClientesPagos() {
        console.log(gv.usuario)

        console.log(gv.usuario[gv.organizacion])

        if (this.Clientessubscribe === undefined) {
            gv.clientes = [];

            this.Clientessubscribe = this.db.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Clientes).stateChanges().subscribe(serverItems => {
                    if (serverItems.length == 0) {
                        console.log("No clients");

                    } else {
                        serverItems.forEach((a, index, array) => {

                            let item: any = a.payload.doc.data();
                            item[gv.key] = a.payload.doc.id;

                            console.log(item); //a.payload.doc.id


                            if (a.payload.type === "added") {
                                gv.clientes.push(item);

                            } else
                                if (a.payload.type === "modified") {
                                    for (let x = 0; x < gv.clientes.length; x++) {
                                        if (gv.clientes[x] !== undefined && gv.clientes[x][gv.key] === a.payload.doc.id) {
                                            gv.clientes[x] = item;
                                            break;
                                        }
                                    }

                                } else
                                    if (a.payload.type === "removed") {
                                        for (let x = 0; x < gv.clientes.length; x++) {
                                            if (gv.clientes[x] !== undefined && gv.clientes[x][gv.key] === a.payload.doc.id) {
                                                gv.clientes.splice(x, 1);

                                                break;
                                            }
                                        }
                                    }

                            if (index === (array.length - 1)) {
                                console.log("Ya termino");

                            }
                        });
                    }
                });
        }

        if (this.PagosSubscribe === undefined) {
            gv.pagos_Arr = [];

            this.PagosSubscribe = this.db.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).stateChanges().subscribe(serverItems => {
                    if (serverItems.length == 0) {
                        console.log("No hay pagos");

                    } else {
                        serverItems.forEach((a, index, array) => {

                            let item: any = a.payload.doc.data();
                            item[gv.key] = a.payload.doc.id;

                            console.log(item); //a.payload.doc.id

                            if (a.payload.type === "added") {
                                gv.pagos_Arr.push(item);

                            } else
                                if (a.payload.type === "modified") {
                                    for (let x = 0; x < gv.pagos_Arr.length; x++) {
                                        if (gv.pagos_Arr[x] !== undefined && gv.pagos_Arr[x][gv.key] === a.payload.doc.id) {
                                            gv.pagos_Arr[x] = item;
                                            break;
                                        }
                                    }

                                } else
                                    if (a.payload.type === "removed") {
                                        for (let x = 0; x < gv.pagos_Arr.length; x++) {
                                            if (gv.pagos_Arr[x] !== undefined && gv.pagos_Arr[x][gv.key] === a.payload.doc.id) {
                                                gv.pagos_Arr.splice(x, 1);

                                                break;
                                            }
                                        }
                                    }

                            if (index === (array.length - 1)) {
                                console.log("Ya termino");

                            }
                        });
                    }
                });
        }
    }

    ColaboradoresSubscribe;
    ListenersColaboradores() {
        if (this.ColaboradoresSubscribe === undefined) {
            console.log("Col")
            gv.colaboradores = [];

            if (gv.usuario[gv.roll] === gv.Dueno) {
                console.log("dueno")
                console.log(gv.usuario[gv.organizacion])

                this.ColaboradoresSubscribe = this.db.collection(gv.FB_Usuarios,
                    ref => ref.where(gv.organizacion, '==', gv.usuario[gv.organizacion])).stateChanges().subscribe(serverItems => {
                        if (serverItems.length == 0) {
                            console.log("No hay usuarios");

                        } else {
                            serverItems.forEach((a, index, array) => {

                                let item: any = a.payload.doc.data();
                                item[gv.key] = a.payload.doc.id;

                                console.log(item); //a.payload.doc.id

                                if (a.payload.type === "added") {
                                    gv.colaboradores.push(item);

                                } else
                                    if (a.payload.type === "modified") {
                                        for (let x = 0; x < gv.colaboradores.length; x++) {
                                            if (gv.colaboradores[x] !== undefined && gv.colaboradores[x][gv.key] === a.payload.doc.id) {
                                                gv.colaboradores[x] = item;
                                                break;
                                            }
                                        }

                                    } else
                                        if (a.payload.type === "removed") {
                                            for (let x = 0; x < gv.colaboradores.length; x++) {
                                                if (gv.colaboradores[x] !== undefined && gv.colaboradores[x][gv.key] === a.payload.doc.id) {
                                                    gv.colaboradores.splice(x, 1);

                                                    break;
                                                }
                                            }
                                        }

                                if (index === (array.length - 1)) {
                                    console.log("Ya termino");

                                }
                            });
                        }
                    });
            }
        }
    }

    GetInformacionCreditoInd(ArrPagos) {
        let Info_Credito = [];
        Info_Credito[gv.cantidad_pagado] = 0;
        Info_Credito[gv.pagos_faltantes] = 0;
        Info_Credito[gv.status_proximo] = 0;
        Info_Credito[gv.cantidad_por_pagar] = 0;
        Info_Credito[gv.status_vencido] = 0;

        for (let x = 0; x < ArrPagos.length; x++) {
            if (ArrPagos[x][gv.cantidad_pagado] !== undefined) {
                Info_Credito[gv.cantidad_pagado] += ArrPagos[x][gv.cantidad_pagado];
            } else

                if (ArrPagos[x][gv.status] === gv.status_proximo) {
                    Info_Credito[gv.pagos_faltantes] += 1;
                    Info_Credito[gv.status_proximo] += ArrPagos[x][gv.pago];
                    Info_Credito[gv.cantidad_por_pagar] += ArrPagos[x][gv.pago];
                } else

                    if (ArrPagos[x][gv.status] === gv.status_vencido) {
                        Info_Credito[gv.pagos_faltantes] += 1;
                        Info_Credito[gv.status_vencido] += ArrPagos[x][gv.pago];
                        Info_Credito[gv.cantidad_por_pagar] += ArrPagos[x][gv.pago];
                    }
        }
        return Info_Credito;
    }

    LogOut() {
        this.localStorage.remove('user');
        this.IrALogin();
        this.DisableSideMenu();
        gv.pagos_Arr = [];
        gv.clientes = [];

        if (this.Clientessubscribe !== undefined) {
            this.Clientessubscribe.unsubscribe();
            this.Clientessubscribe = undefined;
        }
        if (this.PagosSubscribe !== undefined) {
            this.PagosSubscribe.unsubscribe();
            this.PagosSubscribe = undefined;
        }
        if (this.ColaboradoresSubscribe !== undefined) {
            this.ColaboradoresSubscribe.unsubscribe();
            this.ColaboradoresSubscribe = undefined;
        }
    }

    SearchClientsByNameNum(Search) {
        let Clients_Search = [];

        if (Search !== undefined) {
            Clients_Search = gv.clientes.filter(client => {
                return this.CleanAccentCaps(client[gv.nombre]) === this.CleanAccentCaps(Search) ||
                    this.CleanAccentCaps(client[gv.identificador]) === this.CleanAccentCaps(Search);
            });
        }
        return Clients_Search;
    }
    QuitarBarraAInfo(string) {
        let cleanstring = string.replace(/_/g, " ");

        return cleanstring;
    }

    CleanAccentCaps(string: string): string {
        string = string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        string = string.toLowerCase()
        return string
    }

    AgregarCero(Num: number): string {
        var NumComplete = "";
        if (Num.toString().length == 1) {
            NumComplete = "0" + Num.toString();
        } else {
            NumComplete = Num.toString();
        }
        return NumComplete;
    }
    EnableSideMenu() {
        this.menuCtrl.enable(true);
    }
    DisableSideMenu() {
        this.menuCtrl.enable(false);
    }

    loginUser(cred) {
        console.log(cred)
        return firebase.auth().signInWithEmailAndPassword(cred.email, cred.password);
    }
}

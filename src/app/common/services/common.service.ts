import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, MenuController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { gv } from '../constants';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { Response } from 'selenium-webdriver/http';

@Injectable()

export class CommonService {

    constructor(public db: AngularFirestore,
        public alertController: AlertController,
        private menuCtrl: MenuController,
        public router: Router,
        private toastController: ToastController,
        public localStorage: Storage,
        public plt: Platform) {

    }

    //----------------------------------------------------------Collaborador
    CrearCollaborador(Name: string, Password: string, mail: string, organizacion: string,
        ID: number, Etiqueta: string) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(mail, Password).then((data: any) => {
                this.db.collection(gv.FB_Usuarios).doc(data.user.uid).set({
                    [gv.nombre]: Name,
                    [gv.mail]: mail,
                    [gv.organizacion]: organizacion,

                    [gv.ID_Ubicacion]: ID,
                    [gv.tag]: Etiqueta,
                }).then((res) => {
                    console.log("res")
                    console.log(res)

                    if (!firebase.auth().currentUser.emailVerified) {
                        console.log("send mail")
                        firebase.auth().currentUser.sendEmailVerification().then((mail_veri_res) => {
                            console.log("mail sent")
                            console.log(mail_veri_res);
                            resolve(data.user.uid);
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
    ActualizarCollaborador(key: string, Name: string, mail: string, organizacion: string,
        ID: number, Etiqueta: string) {
        return new Promise<any>((resolve, reject) => {
            this.db.collection(gv.FB_Usuarios).doc(key).update({
                [gv.nombre]: Name,
                [gv.mail]: mail,
                [gv.organizacion]: organizacion,

                [gv.ID_Ubicacion]: ID,
                [gv.tag]: Etiqueta
            }).then((res) => {
                resolve(true);
            }).catch(err => {
                reject(false);
            });
        });
    }

    //----------------------------------------------------------CLIENTES
    NuevoCliente(nombre: string, direccion: string, telefono: string, curp: string, fecha_nacimiento: string, sexo: string,
        identificador: string, ID: number) {
        return new Promise<any>((resolve, reject) => {
            let fecha = new Date(fecha_nacimiento);
            this.db.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion]).collection(gv.FB_Clientes).add({
                [gv.nombre]: nombre,
                [gv.direccion]: direccion,
                [gv.telefono]: telefono,
                [gv.curp]: curp,
                [gv.nacimiento]: this.YYMMDDFormatFromDate(fecha),
                [gv.sexo]: sexo,
                [gv.identificador]: identificador,

                [gv.ID_Ubicacion]: ID
            }).then((reponse) => {
                this.Toast('Cliente agregado', 2000);
                resolve(true);
            }).catch((error) => {
                this.Toast('Error al agregar cliente', 2000);
                reject(false);
            });
        });
    }
    ActualizaCliente(nombre: string, direccion: string, telefono: string, curp: string, fecha_nacimiento: string, sexo: string,
        identificador: string, ID: number, key: string) {
        return new Promise<any>((resolve, reject) => {
            let fecha = new Date(fecha_nacimiento);
            this.db.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion]).collection(gv.FB_Clientes).doc(key).update({
                [gv.nombre]: nombre,
                [gv.direccion]: direccion,
                [gv.telefono]: telefono,
                [gv.curp]: curp,
                [gv.nacimiento]: this.YYMMDDFormatFromDate(fecha),
                [gv.sexo]: sexo,
                [gv.identificador]: identificador,

                [gv.ID_Ubicacion]: ID
            }).then((reponse) => {
                this.Toast('Cliente actualizado', 2000);
                resolve(true);
            }).catch((error) => {
                this.Toast('Error al agregar cliente', 2000);
                reject(false);
            });
        });
    }

    //----------------------------------------------------------CREDITOS
    RegistratCredito(total_pagos: number, nombre: string, Key_Creador: string, credito: number,
        fecha, periodo: string, pago: number, identificador: string, efectivo: number,
        total_credito: number, deposito: string, hora: string, ArrGarantias, folio, ArrAval, razon: string,
        cargo_por_servicio: number, ID_Ubicacion: number) {
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
                        this.PrimerPago(x + 1, Key_Creador, efectivo, credito, identificador, pago, gv.status_proximo,
                            this.GetRef(date_credit, hora), total_credito, deposito, key_primer_pago, ArrGarantias, folio,
                            ArrAval, razon, cargo_por_servicio, ID_Ubicacion));

                } else
                    if (x === total_pagos - 1) {
                        var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                            .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                        CreditBatch.set(PaymentRef,
                            this.UltimoPago(x + 1, Key_Creador, total_pagos, identificador, pago, gv.status_proximo,
                                this.GetRef(date_credit, hora), deposito, key_primer_pago, cargo_por_servicio, ID_Ubicacion));
                    } else {
                        var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                            .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                        CreditBatch.set(PaymentRef,
                            this.NormalPago(x + 1, Key_Creador, identificador, pago, gv.status_proximo,
                                this.GetRef(date_credit, hora), deposito, key_primer_pago, cargo_por_servicio, ID_Ubicacion));
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
    PrimerPago(num_pago: number, key_creador: string, efectivo: number, credito: number, identificador: string,
        pago: number, status: string, timeref: number, total_credito: number, deposito: string, key_primer_pago: string, ArrGarantias,
        folio, ArrAval, razon: string, cargo_por_servicio: number, ID_Ubicacion: number) {
        return {
            [gv.total_credito]: Number(total_credito),
            [gv.folio]: folio,
            [gv.ID_Ubicacion]: ID_Ubicacion,

            [gv.aval]: ArrAval,

            [gv.efectivo]: Number(efectivo),
            [gv.credito]: Number(credito),
            [gv.cargo_por_servicio]: Number(cargo_por_servicio),

            [gv.garantias]: ArrGarantias,
            [gv.num_pago]: Number(num_pago),
            [gv.razon_de_credito]: razon,

            [gv.key_creador]: key_creador,
            [gv.identificador]: identificador.toUpperCase(),
            [gv.key_primer_pago]: key_primer_pago,

            [gv.pago]: Number(pago),
            [gv.status]: status,
            [gv.fecha]: Number(timeref),
            [gv.deposito]: deposito
        }
    }
    UltimoPago(num_pago: number, key_creador: string, total_pagos: number, identificador: string, pago: number, status: string,
        timeref: number, deposito: string, key_primer_pago: string, cargo_por_servicio: number, ID_Ubicacion: number) {
        return {
            [gv.total_pagos]: Number(total_pagos),
            [gv.cargo_por_servicio]: Number(cargo_por_servicio),
            [gv.ID_Ubicacion]: ID_Ubicacion,

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
    NormalPago(num_pago: number, key_creador: string, identificador: string, pago: number,
        status: string, timeref: number, deposito: string, key_primer_pago: string, cargo_por_servicio: number, ID_Ubicacion: number) {
        return {
            [gv.num_pago]: Number(num_pago),
            [gv.ID_Ubicacion]: ID_Ubicacion,
            [gv.cargo_por_servicio]: Number(cargo_por_servicio),
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
    ConvertYYMMDDtoDDMMYY(date: string) {
        let split_date = date.split("/");

        return [split_date[2], split_date[1], split_date[0]].join('/');
    }
    BuscarCreditoPorFolio(folio: string) {
        let Credito = [];
        Credito = gv.pagos_Arr.filter(pago => {
            return pago[gv.folio] === folio;
        });
        return Credito;
    }

    //-------------------------------------------------------MODIFICAR CREDITO
    PagoCredito(Proximo, PrimerPago, ArrPagos, multa: number, pay: number, name: string, today: Date) {
        return new Promise<any>((resolve, reject) => {

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
                    [gv.cargo_por_servicio]: firebase.firestore.FieldValue.increment(multa),
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

                    let cargo = Proximo[gv.cargo_por_servicio] - pay;

                    if (cargo < 0) {
                        cargo = 0;
                    }

                    let ParcialPay = this.NormalPago(Math.floor((Proximo[gv.num_pago] + .1) * 10) / 10, PrimerPago[gv.key_creador],
                        PrimerPago[gv.identificador], Proximo[gv.pago] - pay, gv.status_vencido,
                        Proximo[gv.fecha], PrimerPago[gv.deposito], PrimerPago[gv.key], cargo, PrimerPago[gv.ID_Ubicacion]);

                    PaymentBatch.set(PaymentRef, ParcialPay);
                }
            } else
                if (Proximo[gv.pago] < pay) {
                    console.log("Pay bigger than payment");

                    var Total_Pay_Ref = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                        .collection(gv.FB_Pagos).doc(Proximo['key']);

                    PaymentBatch.update(Total_Pay_Ref, {
                        [gv.status]: gv.status_pagado,
                        [gv.cantidad_pagado]: Number(pay + multa),
                        [gv.cargo_por_servicio]: firebase.firestore.FieldValue.increment(multa),
                        [gv.pago]: Number(pay + multa),
                        [gv.multa]: Number(multa),
                        [gv.cobrado_por]: name,
                        [gv.dia_cobro]: this.GetRef(today, this.AgregarCero(today.getHours()) + '' + this.AgregarCero(today.getMinutes()))
                    });

                    pay -= Proximo[gv.pago]

                    let NextPay = [];
                    NextPay = ArrPagos.filter(pago => {
                        return pago[gv.status] === gv.status_proximo ||
                            pago[gv.status] === gv.status_vencido;
                    });
                    NextPay.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

                    for (let x = (NextPay.length - 1); x > 0; x--) {
                        if (NextPay[x][gv.pago] > pay) {
                            var Total_Pay_Ref = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                                .collection(gv.FB_Pagos).doc(NextPay[x]['key']);

                            PaymentBatch.update(Total_Pay_Ref, {
                                [gv.pago]: firebase.firestore.FieldValue.increment(-pay),
                                [gv.total_pagos]: Number(NextPay[x][gv.num_pago])
                            });
                            break;
                        } else
                            if (NextPay[x][gv.pago] === pay) {
                                console.log("Pay = FINAL")
                                var Total_Pay_Ref = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                                    .collection(gv.FB_Pagos).doc(NextPay[x]['key']);

                                PaymentBatch.delete(Total_Pay_Ref);

                                var NewLastPayment = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                                    .collection(gv.FB_Pagos).doc(NextPay[x - 1]['key']);

                                PaymentBatch.update(NewLastPayment, {
                                    [gv.total_pagos]: NextPay[x - 1][gv.num_pago]
                                });

                                break;
                            } else
                                if (NextPay[x][gv.pago] < pay) {
                                    console.log("Pay > FINAL")
                                    pay -= NextPay[x][gv.pago];

                                    var Total_Pay_Ref = this.db.firestore.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion])
                                        .collection(gv.FB_Pagos).doc(NextPay[x]['key']);

                                    PaymentBatch.delete(Total_Pay_Ref);
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
                            [gv.cargo_por_servicio]: firebase.firestore.FieldValue.increment(multa),
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
            let Total_Cargo = 0;

            for (let x = 0; x < ArrPagos.length; x++) {
                Total_Remaining += ArrPagos[x][gv.pago];
                Total_Cargo += ArrPagos[x][gv.cargo_por_servicio];

                if (ArrPagos[x][gv.status] !== gv.status_pagado && x > 0) {
                    var EliminatedPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(ArrPagos[x]['key']);

                    SettleBatch.delete(EliminatedPaymentRef);
                }
            }

            let LastPayment = this.UltimoPago(Proximo[gv.num_pago], Proximo[gv.key_creador], Proximo[gv.num_pago],
                Proximo[gv.identificador], Total_Remaining - pago_perdonado, gv.status_pagado, Proximo[gv.fecha],
                Proximo[gv.deposito], Proximo[gv.key_primer_pago], Total_Cargo, Proximo[gv.ID_Ubicacion]);

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
            });
            let Total_Cargo = 0;

            for (let x = 0; x < ArrPagos.length; x++) {
                //Count the amount left to pay
                TotalPay += ArrPagos[x][gv.pago];
                Total_Cargo += ArrPagos[x][gv.cargo_por_servicio];
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
                    //Set remaining normal payments
                    var NormalPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                    ReStructure.set(NormalPaymentRef,
                        this.NormalPago(Math.ceil(ArrPagos[0][gv.num_pago]) + y, Proximo[gv.key_creador],
                            Proximo[gv.identificador], pago, gv.status_proximo,
                            this.GetRef(date_credit, this.AgregarCero(date_credit.getHours()) + '' + this.AgregarCero(date_credit.getMinutes())),
                            Proximo[gv.deposito], Proximo[gv.key_primer_pago], Total_Cargo / Num_payments, Proximo[gv.ID_Ubicacion]));

                } else {
                    //Set last payment of re estructure
                    var LastPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                    ReStructure.set(LastPaymentRef,
                        this.UltimoPago(Math.ceil(ArrPagos[0][gv.num_pago] + y), Proximo[gv.key_creador],
                            Num_payments, Proximo[gv.identificador], pago, gv.status_proximo,
                            this.GetRef(date_credit, this.AgregarCero(date_credit.getHours()) + '' + this.AgregarCero(date_credit.getMinutes())),
                            Proximo[gv.deposito], Proximo[gv.key_primer_pago], Total_Cargo / Num_payments, Proximo[gv.ID_Ubicacion]));
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
    AgregarPagosMulta(ArrPagos, Pagos_Extra: number, pago: number) {
        return new Promise<any>((resolve, reject) => {
            var PaymentBatch = this.db.firestore.batch();

            //Add total pay to added credit
            var FirstPayRef = this.db.firestore.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(ArrPagos[0]['key']);

            PaymentBatch.update(FirstPayRef, {
                [gv.total_credito]: Number(ArrPagos[0][gv.total_credito] + Pagos_Extra * pago),
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
                        this.NormalPago(ArrPagos[ArrPagos.length - 1][gv.num_pago] + x + 1, ArrPagos[0][gv.key_creador],
                            ArrPagos[0][gv.identificador], pago, gv.status_proximo,
                            this.GetRef(date_credit, this.AgregarCero(date_credit.getHours()) + '' + this.AgregarCero(date_credit.getMinutes())),
                            ArrPagos[0][gv.deposito], ArrPagos[0][gv.key_primer_pago], pago, ArrPagos[0][gv.identificador]));

                } else {
                    //Set LastPayment
                    var LastPaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                        .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc();

                    PaymentBatch.set(LastPaymentRef,
                        this.UltimoPago(ArrPagos[ArrPagos.length - 1][gv.num_pago] + x + 1, ArrPagos[0][gv.key_creador],
                            ArrPagos[ArrPagos.length - 1][gv.total_pagos] + Pagos_Extra, ArrPagos[0][gv.identificador], pago,
                            gv.status_proximo,
                            this.GetRef(date_credit, this.AgregarCero(date_credit.getHours()) + '' + this.AgregarCero(date_credit.getMinutes())),
                            ArrPagos[0][gv.deposito], ArrPagos[0][gv.key_primer_pago], pago, ArrPagos[0][gv.ID_Ubicacion]));
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
    RegresarPago(Pago, PrimerPago, ArrPagos) {
        return new Promise<any>((resolve, reject) => {

            var ReturnPayment = this.db.firestore.batch();

            var FirstPayRef = this.db.firestore.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(PrimerPago['key']);

            ReturnPayment.update(FirstPayRef, {
                [gv.total_credito]: firebase.firestore.FieldValue.increment(- Pago[gv.multa]),
            });

            let Pago_Real = Pago[gv.pago];

            let NextPay = [];
            NextPay = ArrPagos.filter(pago => {
                return pago[gv.num_pago] < Math.floor(Pago[gv.num_pago]) + 1 &&
                    pago[gv.num_pago] > Pago[gv.num_pago];
            });

            for (let x = 0; x < NextPay.length; x++) {
                Pago_Real += NextPay[x][gv.pago];

                var EliminatePayRef = this.db.firestore.collection(gv.FB_Organizaciones)
                    .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(NextPay[x]['key']);

                ReturnPayment.delete(EliminatePayRef);
            }

            var PaymentRef = this.db.firestore.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos).doc(Pago['key']);
            ReturnPayment.update(PaymentRef, {
                [gv.status]: gv.status_proximo,
                [gv.explicacion]: firebase.firestore.FieldValue.delete(),
                [gv.modificado_por]: firebase.firestore.FieldValue.delete(),
                [gv.dia_cobro]: firebase.firestore.FieldValue.delete(),
                [gv.cobrado_por]: firebase.firestore.FieldValue.delete(),
                [gv.cantidad_pagado]: firebase.firestore.FieldValue.delete(),
                [gv.multa]: firebase.firestore.FieldValue.delete(),
                [gv.pago]: Number(Pago_Real - Pago[gv.multa])
            });


            ReturnPayment.commit().then(response => {
                console.log("Done payment Batch")
                resolve(true)
            });
        });
    }
    async RegresarPagoAlerta(Pago, PrimerPago, ArrPagos) {
        const alert = await this.alertController.create({
            mode: 'ios',
            header: "Eliminar pago",
            message: "¿Seguro que quieres regresar el pago " + Pago[gv.num_pago] +
                " por " + Pago[gv.pago] + " a proximo?",
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
                        this.RegresarPago(Pago, PrimerPago, ArrPagos)
                    }
                }
            ]
        });
        await alert.present();
    }

    //---------------------------------------------------------PRODUCTO
    AgregarProducto(credito: number, total_pagos: number, periodo: string, pago: number, total_credito: number, efectivo: number) {
        return new Promise<any>((resolve, reject) => {

            this.db.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion]).collection(gv.FB_Info).doc(gv.FB_Productos).update({
                [`${gv.FB_Productos}.${credito + total_pagos + total_credito + periodo}`]: {
                    [gv.credito]: Number(credito),
                    [gv.total_pagos]: Number(total_pagos),
                    [gv.periodo]: periodo,
                    [gv.pago]: Number(pago),
                    [gv.total_credito]: Number(total_credito),
                    [gv.efectivo]: Number(efectivo)
                }
            }).then((reponse) => {
                this.Toast('Producto agregado', 2000);
                resolve(true);
            }).catch((error) => {
                this.Toast('Error al agregar el producto', 2000);
                reject(false);
            });
        })

    }
    EliminarProducto(key) {
        this.db.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion]).collection(gv.FB_Info).doc(gv.FB_Productos).update({
            [`${gv.FB_Productos}.${key}`]: firebase.firestore.FieldValue.delete()

        }).then((reponse) => {
            this.Toast('Producto eliminado', 2000);
        }).catch((error) => {
            this.Toast('Error al eliminar el producto', 2000);
        });
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
    //Sacar fecha de REF
    GetYYMMDDDateFromRef(Ref: number): string {
        var StringRef = Ref.toString();
        var date = new Date();

        date.setFullYear(parseInt("20" + StringRef.substring(0, 2)));
        date.setMonth(parseInt(StringRef.substring(2, 4)) - 1);
        date.setDate(parseInt(StringRef.substring(4, 6)));
        date.setHours(parseInt(StringRef.substring(6, 8)));
        date.setMinutes(parseInt(StringRef.substring(8, 10)));


        return this.YYMMDDFormatFromDate(date);
    }
    GetID(Region: number, Dominio: number, Sucursal: number, DM: number, AG: number) {
        return this.AgregarCero(Region) + this.AgregarCero(Dominio) + this.AgregarCero(Sucursal)
            + this.AgregarCero(DM) + this.AgregarCero(AG);
    }
    GetElementosDeID(ID) {
        let ID_El = [];

        for (let i = 0; i < 5; i++) {
            if (i === 0) {
                ID_El[gv.agente] = ID % 100

                if (ID % 100 === 0) {
                    ID_El[gv.ID_Ubicacion] = gv.dm;
                } else {
                    ID_El[gv.ID_Ubicacion] = gv.agente;
                }
            } else if (i === 1) {
                ID_El[gv.dm] = ID % 100

                if (ID % 100 === 0) {
                    ID_El[gv.ID_Ubicacion] = gv.sucursal;
                }
            } else if (i === 2) {
                ID_El[gv.sucursal] = ID % 100
                if (ID % 100 === 0) {
                    ID_El[gv.ID_Ubicacion] = gv.zona;
                }
            } else if (i === 3) {
                ID_El[gv.zona] = ID % 100
                if (ID % 100 === 0) {
                    ID_El[gv.ID_Ubicacion] = gv.region;
                }
            } else if (i === 4) {
                ID_El[gv.region] = ID
            }
            ID = Math.floor(ID / 100)
        }
        return ID_El;
    }
    GetValorEspecificado(valor, ID) {
        if (valor === gv.agente) {
            return ID % 100;
        } else
            if (valor === gv.dm) {
                ID = Math.floor(ID / 100)
                return ID % 100;
            } else
                if (valor === gv.sucursal) {
                    ID = Math.floor(ID / 10000)
                    return ID % 100;
                } else
                    if (valor === gv.zona) {
                        ID = Math.floor(ID / 1000000)
                        return ID % 100;
                    } else
                        if (valor === gv.region) {
                            ID = Math.floor(ID / 100000000)
                            return ID % 100;
                        }
    }
    GetRangoDeID(ID) {
        let Rango = [];

        if (ID % 100 !== 0) {
            Rango[0] = ID;
            Rango[1] = ID;
        } else
            if (ID % 10000 !== 0) {

                Rango[0] = ID;
                Rango[1] = ID + 99;
            } else
                if (ID % 1000000 !== 0) {

                    Rango[0] = ID;
                    Rango[1] = ID + 9999;
                } else
                    if (ID % 100000000 !== 0) {

                        Rango[0] = ID;
                        Rango[1] = ID + 999999;
                    } else
                        if (ID % 10000000000 !== 0) {

                            Rango[0] = ID;
                            Rango[1] = ID + 99999999;
                        }
        return Rango;
    }

    CheckLogin() {
        this.localStorage.get('user').then((val) => {
            if (val) {
                console.log("logged in")
                console.log(val)
                gv.usuario = val;

                this.ListenersClientesPagos();
                this.ListenersColaboradores();

                if (gv.usuario[gv.organizacion] === undefined) {
                    this.IrANuevaFinanciera();
                } else
                    if (this.router.url === '/login') {
                        this.IrAClientes();
                    }

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
    IrANuevaFinanciera() {
        this.router.navigateByUrl('newfinance');
    }
    IrACreditos() {
        this.router.navigateByUrl('credit');
    }

    Clientessubscribe;
    PagosSubscribe;
    InfoSubscribe;
    ListenersClientesPagos() {

        if (this.Clientessubscribe === undefined && gv.usuario[gv.organizacion] !== undefined) {
            gv.clientes = [];

            this.Clientessubscribe = this.db.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Clientes,
                    ref => ref
                        .where(gv.ID_Ubicacion, '>=', this.GetRangoDeID(gv.usuario[gv.ID_Ubicacion])[0])
                        .where(gv.ID_Ubicacion, '<=', this.GetRangoDeID(gv.usuario[gv.ID_Ubicacion])[1])

                ).stateChanges().subscribe(serverItems => {
                    if (serverItems.length == 0) {
                        console.log("No clients");
                        gv.DT_Clientes = true;

                    } else {
                        console.log("Clientes")
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
                                gv.DT_Clientes = true;

                            }
                        });
                    }
                });
        }

        if (this.PagosSubscribe === undefined && gv.usuario[gv.organizacion] !== undefined) {
            gv.pagos_Arr = [];

            this.PagosSubscribe = this.db.collection(gv.FB_Organizaciones)
                .doc(gv.usuario[gv.organizacion]).collection(gv.FB_Pagos,
                    ref => ref
                        .where(gv.ID_Ubicacion, '>=', this.GetRangoDeID(gv.usuario[gv.ID_Ubicacion])[0])
                        .where(gv.ID_Ubicacion, '<=', this.GetRangoDeID(gv.usuario[gv.ID_Ubicacion])[1])
                ).stateChanges().subscribe(serverItems => {
                    if (serverItems.length == 0) {
                        console.log("No hay pagos");
                        gv.DT_Pagos = true;

                    } else {
                        console.log("Pagos")

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
                                gv.DT_Pagos = true;

                            }
                        });
                    }
                });
        }

        if (this.InfoSubscribe === undefined && gv.usuario[gv.organizacion] !== undefined) {
            this.db.collection(gv.FB_Organizaciones).doc(gv.usuario[gv.organizacion]).collection(gv.FB_Info)
                .stateChanges().subscribe(serverItems => {
                    serverItems.forEach((a, index, array) => {
                        let item: any = a.payload.doc.data(); //a.payload.doc.id;
                        console.log("INFO " + a.payload.doc.id)
                        console.log(item[gv.FB_Productos])

                        if (a.payload.doc.id === gv.FB_Productos) {
                            const keys = Object.keys(item[gv.FB_Productos])
                            for (let key of keys) {
                                console.log("producto")
                                console.log(item[gv.FB_Productos][key])

                                item[gv.FB_Productos][key]['key'] = key;
                                gv.ArrProductos.push(item[gv.FB_Productos][key])
                            }
                        } else
                            if (a.payload.doc.id === gv.FB_Banco) {
                                gv.ArrProductos = item[gv.FB_Banco];
                                const keys = Object.keys(item[gv.FB_Banco])
                                for (let key of keys) {
                                    console.log("Cuenta banco")
                                    console.log(item[gv.FB_Banco][key])

                                    item[gv.FB_Banco][key]['key'] = key;
                                    gv.ArrBancos.push(item[gv.FB_Banco][key])
                                }

                            }

                    });

                });
        }
    }

    ColaboradoresSubscribe;
    ListenersColaboradores() {
        if (this.ColaboradoresSubscribe === undefined) {
            gv.colaboradores = [];

            this.ColaboradoresSubscribe = this.db.collection(gv.FB_Usuarios,
                ref => ref.where(gv.ID_Ubicacion, '>=', this.GetRangoDeID(gv.usuario[gv.ID_Ubicacion])[0])
                    .where(gv.ID_Ubicacion, '<=', this.GetRangoDeID(gv.usuario[gv.ID_Ubicacion])[1])
            ).stateChanges().subscribe(serverItems => {
                if (serverItems.length == 0) {
                    console.log("No hay usuarios");

                } else {
                    console.log("Colaboradores")

                    serverItems.forEach((a, index, array) => {

                        let item: any = a.payload.doc.data();
                        item[gv.key] = a.payload.doc.id;

                        console.log(item); //a.payload.doc.id

                        if (a.payload.doc.id === gv.usuario[gv.key]) {
                            console.log("actualizado")
                            this.localStorage.set('user', item);
                            gv.usuario = item;
                        }

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
                            gv.DT_Colaboradores = true;

                        }
                    });
                }
            });
        }
    }

    GetInformacionCreditoInd(ArrPagos) {
        let Info_Credito = [];
        Info_Credito[gv.cantidad_pagado] = 0;
        Info_Credito[gv.pagos_faltantes] = 0;
        Info_Credito[gv.status_proximo] = 0;
        Info_Credito[gv.cantidad_por_pagar] = 0;
        Info_Credito[gv.status_vencido] = 0;
        Info_Credito[gv.status_pagado] = 0;

        for (let x = 0; x < ArrPagos.length; x++) {
            if (ArrPagos[x][gv.cantidad_pagado] !== undefined) {
                Info_Credito[gv.cantidad_pagado] += ArrPagos[x][gv.cantidad_pagado];
                Info_Credito[gv.status_pagado] += 1;
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
        if (this.InfoSubscribe !== undefined) {
            this.InfoSubscribe.unsubscribe();
            this.InfoSubscribe = undefined;
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
        if (string !== undefined) {
            let cleanstring = string.replace(/#/g, " ");
            return cleanstring;
        } else {
            return "";
        }
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
    GetCURP(Paterno, Materno, Nombre, Fecha: Date, Genero, Edo) {
        var CURP = [];
        CURP[0] = Paterno.charAt(0).toUpperCase();
        CURP[1] = Paterno.slice(1).replace(/\a\e\i\o\u/gi, "").charAt(0).toUpperCase();
        CURP[2] = Materno.charAt(0).toUpperCase();
        CURP[3] = Nombre.charAt(0).toUpperCase();
        CURP[4] = Fecha.getFullYear().toString().slice(2);
        CURP[5] = this.AgregarCero((Fecha.getMonth() + 1));
        CURP[6] = this.AgregarCero(Fecha.getDate());
        CURP[7] = Genero.toUpperCase();
        //CURP[8] = abreviacion[estados.indexOf($("#estado").val().toLowerCase())];
        CURP[8] = Edo;
        CURP[9] = Paterno.slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();
        CURP[10] = Materno.slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();
        CURP[11] = Nombre.slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();;
        //CURP[12] = ano < 2000 ? random09a : abc[randomAZ];
        //CURP[13] = random09b;
        return CURP.join("");
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

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
        total_credito: number, deposito: string, hora: string) {
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
                            this.GetRef(date_credit, hora), total_credito, deposito));
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
        pago: number, status: string, timeref: number, total_credito: number, deposito: string) {
        return {
            [gv.total_credito]: Number(total_credito),

            [gv.efectivo]: Number(efectivo),
            [gv.credito]: Number(credito),

            [gv.nombre]: nombre,
            [gv.num_pago]: Number(num_pago),

            [gv.key_creador]: key_creador,
            [gv.identificador]: identificador.toUpperCase(),

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
                                    gv.status_proximo, NextPay[x][gv.fecha], NextPay[x][gv.deposito],  PrimerPago[gv.key]));
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
                /*
                if (gv.ClientsSubscribe === undefined || gv.PaymentsSubscribe === undefined) {
                    this.ListenersPaymentsClients();
                }
                */
                this.ListenersClientesPagos();
            } else {
                this.IrALogin();
            }
        });
    }

    IrALogin() {
        this.router.navigateByUrl('login');
    }

    ListenersClientesPagos() {

        gv.clientes = [];
        console.log(gv.usuario[gv.organizacion])

        let ClientesSubscribe = this.db.collection(gv.FB_Organizaciones)
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

        let PagosSubscribe = this.db.collection(gv.FB_Organizaciones)
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
}

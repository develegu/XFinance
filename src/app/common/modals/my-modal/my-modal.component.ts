import { Component, Input } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonService } from 'src/app/common/services/common.service';
import { gv, Estados } from '../../constants';

@Component({
  selector: "app-my-modal",
  templateUrl: "my-modal.component.html",
  styleUrls: ["./my-modal.component.scss"]
})

export class MyModal {
  public gv = gv;
  @Input() myParam: string;

  Estados = Estados[0];

  dismiss() {

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  constructor(
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    public gf: CommonService,
  ) {
  }

  AlertText = '';
  btn_disabled = false;
  type;
  Tipo;
  PermisosUsuario = [];
  ngOnInit() {
    if (this.type === 'Usuario') {
      this.SepararUsuarios();

      console.log(gv.usuario)
      this.PermisosUsuario = this.gf.GetElementosDeID(gv.usuario[gv.ID_Ubicacion])
      console.log(this.PermisosUsuario)

      this.PermisosUsuario[gv.nombre] = gv.usuario[gv.nombre];
      this.PermisosUsuario[gv.tag] = gv.usuario[gv.tag];

      if (this.PermisosUsuario[gv.ID_Ubicacion] === gv.dm) {
        console.log("dm")
        this.ArrSel[gv.dm].push(this.PermisosUsuario);

        this.Usuario.Region = this.PermisosUsuario[gv.region];
        this.Usuario.Sucursal = this.PermisosUsuario[gv.sucursal];
        this.Usuario.Zona = this.PermisosUsuario[gv.zona];
        this.Usuario.DM = this.PermisosUsuario[gv.dm];

        this.Roles.push({
          [gv.agente]: gv.agente
        })
      } else
        if (this.PermisosUsuario[gv.ID_Ubicacion] === gv.sucursal) {
          console.log("Sucursal")
          this.ArrSel[gv.sucursal].push(this.PermisosUsuario);

          this.Usuario.Region = this.PermisosUsuario[gv.region];
          this.Usuario.Sucursal = this.PermisosUsuario[gv.sucursal];

          this.Roles.push({
            [gv.agente]: gv.agente,
            [gv.dm]: gv.dm,
            [gv.sucursal]: gv.sucursal
          })
        } else
          if (this.PermisosUsuario[gv.ID_Ubicacion] === gv.zona) {
            console.log("zona")
            this.ArrSel[gv.zona].push(this.PermisosUsuario);

            this.Usuario.Region = this.PermisosUsuario[gv.region];
            this.Usuario.Sucursal = this.PermisosUsuario[gv.sucursal];
            this.Usuario.Zona = this.PermisosUsuario[gv.zona];

            this.Roles.push({
              [gv.agente]: gv.agente,
              [gv.dm]: gv.dm
            })
          } else
            if (this.PermisosUsuario[gv.ID_Ubicacion] === gv.region) {
              console.log("Region")
              this.ArrSel[gv.region].push(this.PermisosUsuario);

              this.Usuario.Region = this.PermisosUsuario[gv.region];

              this.Roles.push({
                [gv.agente]: gv.agente,
                [gv.dm]: gv.dm,
                [gv.sucursal]: gv.sucursal,
                [gv.zona]: gv.zona
              })
            } else
              if (this.PermisosUsuario[gv.ID_Ubicacion] === gv.dueno) {
                console.log("dueno")

                this.Roles.push({
                  [gv.agente]: gv.agente,
                  [gv.dm]: gv.dm,
                  [gv.sucursal]: gv.sucursal,
                  [gv.zona]: gv.zona,
                  [gv.region]: gv.region
                })
              }

      this.GetOpciones();

      this.Usuario.Organizacion = gv.usuario[gv.organizacion];

      if (this.Tipo === gv.Actualizar) {
        this.Usuario.Mail = this.Mod_Usuario[gv.mail];
        this.Usuario.Nombre = this.Mod_Usuario[gv.nombre];
        this.Usuario.Roll = this.Mod_Usuario[gv.roll];
      }
    }

    if (this.type === 'Cliente' && this.Tipo === gv.Actualizar) {
      console.log(this.Info_Cliente)
      let ArrNombre = this.Info_Cliente[gv.nombre].split('_');
      console.log(ArrNombre);
      this.Cliente.Nombre = ArrNombre[0];
      this.Cliente.ApellidoP = ArrNombre[1];
      this.Cliente.ApellidoM = ArrNombre[2];

      let ArrDireccion = this.Info_Cliente[gv.direccion].split('_');
      console.log(ArrDireccion);
      this.Cliente.Calle = ArrDireccion[0];
      this.Cliente.NumeroInt = ArrDireccion[1];
      this.Cliente.NumeroExt = ArrDireccion[2];
      this.Cliente.Colonia = ArrDireccion[3];
      this.Cliente.Municipio = ArrDireccion[4];
      this.Cliente.Estado = ArrDireccion[5];
      this.Cliente.CP = ArrDireccion[6];

      this.Cliente.Sexo = this.Info_Cliente[gv.sexo];
      this.Cliente.Identificador = this.Info_Cliente[gv.identificador];
      this.Cliente.Cumpleanos = this.Info_Cliente[gv.fecha];
      this.Cliente.Telefono = this.Info_Cliente[gv.telefono];
      this.Cliente.CURP = this.Info_Cliente[gv.curp];

    }

    if (this.type === 'Pago') {

      this.PagosArr = gv.pagos_Arr.filter(pago => {
        return pago[gv.key_primer_pago] === this.Key_Primer_Pago;
      });
      this.PagosArr.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

      this.ProximosArr = this.PagosArr.filter(pago => {
        return pago[gv.status] === gv.status_proximo ||
          pago[gv.status] === gv.status_vencido;
      });
      this.ProximosArr.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

      this.Info_Credito = this.gf.GetInformacionCreditoInd(this.PagosArr);
      console.log(this.Info_Credito)

      console.log(this.PagosArr);
      console.log(this.ProximosArr);

    }
  }
  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  //USUARIO
  Mod_Usuario;
  Usuario = {
    Nombre: '',
    Mail: '',
    Contrasena: '',
    Confirmar: '',
    Roll: '',
    Organizacion: '',

    Region: 0,
    Zona: 0,
    Sucursal: 0,
    DM: 0,
    AG: 0,

    Etiqueta: ''
  }
  Roles = [];

  AgregarUsuario() {
    if (this.Usuario.Mail === '') {
      this.Incomplete = true;
      this.AlertText = 'Falta el mail'
      return;
    }

    if (this.Tipo === gv.Actualizar) {
      this.gf.ActualizarCollaborador(this.Mod_Usuario[gv.key], this.Usuario.Nombre, this.Usuario.Mail, this.Usuario.Organizacion,
        parseInt(this.gf.GetID(this.Usuario.Region, this.Usuario.Zona, this.Usuario.Sucursal, this.Usuario.DM, this.Usuario.AG)),
        this.Usuario.Etiqueta)
        .then(res => {
          this.closeModal();
        })
        .catch(err => {
          this.closeModal();
        });

    } else {
      if (this.Usuario.Region === null) {
        this.Usuario.Region = 1;
      }
      if (this.Usuario.Zona === null) {
        this.Usuario.Zona = 0;
      }
      if (this.Usuario.Sucursal === null) {
        this.Usuario.Sucursal = 0;
      }
      if (this.Usuario.DM === null) {
        this.Usuario.DM = 0;
      }
      if (this.Usuario.AG === null) {
        this.Usuario.AG = 0;
      }

      this.gf.CrearCollaborador(this.Usuario.Nombre, this.Usuario.Contrasena, this.Usuario.Mail, this.Usuario.Organizacion,
        parseInt(this.gf.GetID(this.Usuario.Region, this.Usuario.Zona, this.Usuario.Sucursal, this.Usuario.DM, this.Usuario.AG)),
        this.Usuario.Etiqueta)
        .then(res => {
          this.closeModal();
        })
        .catch(err => {
          this.closeModal();
        });
    }
  }
  //CUANDO SELECCIONAN ALGUNA OPCION DE ID
  IDSelected(selected) {
    this.GetOpciones();

    if (selected === gv.region) {
      this.Usuario.Zona = 0;
      this.Usuario.Sucursal = 0;
      this.Usuario.DM = 0;
      this.Usuario.AG = 0;
    } else
      if (selected === gv.zona) {
        this.Usuario.Sucursal = 0;
        this.Usuario.DM = 0;
        this.Usuario.AG = 0;
        console.log("Zona seleccionada")
      } else
        if (selected === gv.sucursal) {
          this.Usuario.DM = 0;
          this.Usuario.AG = 0;
        } else
          if (selected === gv.dm) {
            this.Usuario.AG = 0;
          }
  }
  //SETTER LAS OPCIONES DISPONIBLES PARA CADA CAMPO
  GetOpciones() {
    this.ArrSel[gv.zona] = this.ArrUsers[gv.zona].filter(cliente => {
      return cliente[gv.region] === this.Usuario.Region;
    });
    this.ArrSel[gv.sucursal] = this.ArrUsers[gv.sucursal].filter(cliente => {
      return cliente[gv.zona] === this.Usuario.Zona &&
        cliente[gv.region] === this.Usuario.Region;
    });
    this.ArrSel[gv.dm] = this.ArrUsers[gv.dm].filter(cliente => {
      return cliente[gv.sucursal] === this.Usuario.Sucursal &&
        cliente[gv.region] === this.Usuario.Region &&
        cliente[gv.zona] === this.Usuario.Zona;
    });
    this.ArrSel[gv.agente] = this.ArrUsers[gv.agente].filter(cliente => {
      return cliente[gv.dm] === this.Usuario.DM &&
        cliente[gv.region] === this.Usuario.Region &&
        cliente[gv.zona] === this.Usuario.Zona &&
        cliente[gv.sucursal] === this.Usuario.Sucursal;
    });

    if (this.ArrSel[gv.zona].length === 0 && this.Usuario.Roll !== gv.zona) {
      this.ArrSel[gv.zona].push({
        [gv.nombre]: "Zona",
        [gv.zona]: 1
      })
    }
    if (this.ArrSel[gv.sucursal].length === 0 && this.Usuario.Roll !== gv.sucursal) {
      this.ArrSel[gv.sucursal].push({
        [gv.nombre]: "Sucursal",
        [gv.sucursal]: 1
      })
    }
    if (this.ArrSel[gv.dm].length === 0 && this.Usuario.Roll !== gv.dm) {
      this.ArrSel[gv.dm].push({
        [gv.nombre]: "Gerente",
        [gv.dm]: 1
      })
    }
    console.log(this.ArrSel)

    if (this.Usuario.Roll === gv.region) {
      this.ArrSel[gv.agente] = [];
      this.ArrSel[gv.dm] = [];
      this.ArrSel[gv.sucursal] = [];
      this.ArrSel[gv.zona] = [];

      this.Usuario.AG = 0;
      this.Usuario.DM = 0;
      this.Usuario.Sucursal = 0;
      this.Usuario.Zona = 0;

    } else
      if (this.Usuario.Roll === gv.zona) {

        let proximo = 1;
        if (this.ArrSel[gv.zona].length !== 0) {
          this.ArrSel[gv.zona].sort((a, b) => { return a[gv.zona] - b[gv.zona] });
          proximo = this.ArrSel[gv.zona][this.ArrSel[gv.zona].length - 1][gv.zona] + 1;
          this.Usuario.Zona = proximo;
          this.ArrSel[gv.zona] = [];
        }

        this.ArrSel[gv.agente] = [];
        this.ArrSel[gv.dm] = [];
        this.ArrSel[gv.sucursal] = [];

        this.Usuario.AG = 0;
        this.Usuario.DM = 0;
        this.Usuario.Sucursal = 0;

        this.ArrSel[gv.zona].push({
          [gv.nombre]: "Proxima zona",
          [gv.zona]: proximo
        });

      } else
        if (this.Usuario.Roll === gv.sucursal) {
          let proximo = 1;

          if (this.ArrSel[gv.sucursal].length !== 0) {
            this.ArrSel[gv.sucursal].sort((a, b) => { return a[gv.sucursal] - b[gv.sucursal] });

            let proximo = this.ArrSel[gv.sucursal][this.ArrSel[gv.sucursal].length - 1][gv.sucursal] + 1;
            this.Usuario.Sucursal = proximo;
            this.ArrSel[gv.sucursal] = [];
          }
          this.ArrSel[gv.agente] = [];
          this.ArrSel[gv.dm] = [];

          this.Usuario.AG = 0;
          this.Usuario.DM = 0;

          this.ArrSel[gv.sucursal].push({
            [gv.nombre]: "Proxima sucursal",
            [gv.sucursal]: proximo,
            [gv.info]: gv.Nuevo
          });

        } else
          if (this.Usuario.Roll === gv.dm) {
            let proximo = 1;
            if (this.ArrSel[gv.dm].length !== 0) {
              this.ArrSel[gv.dm].sort((a, b) => { return a[gv.dm] - b[gv.dm] });
              proximo = this.ArrSel[gv.dm][this.ArrSel[gv.dm].length - 1][gv.dm] + 1;
              this.Usuario.AG = proximo;
              this.ArrSel[gv.dm] = [];
            }
            this.ArrSel[gv.agente] = [];
            this.Usuario.AG = 0;

            this.ArrSel[gv.dm].push({
              [gv.nombre]: "Proximo gerente",
              [gv.dm]: proximo
            });
          } else
            if (this.Usuario.Roll === gv.agente) {
              let proximo = 1;
              if (this.ArrSel[gv.agente].length !== 0) {
                this.ArrSel[gv.agente].sort((a, b) => { return a[gv.agente] - b[gv.agente] });
                proximo = this.ArrSel[gv.agente][this.ArrSel[gv.agente].length - 1][gv.agente] + 1;
                this.Usuario.AG = proximo;
                this.ArrSel[gv.agente] = [];
              }
              this.ArrSel[gv.agente] = [];

              this.ArrSel[gv.agente].push({
                [gv.nombre]: "Proximo agente",
                [gv.agente]: proximo
              });
            }
  }
  ArrSel = {
    [gv.region]: [],
    [gv.zona]: [],
    [gv.sucursal]: [],
    [gv.dm]: [],
    [gv.agente]: [],
  };
  ArrUsers = {
    [gv.region]: [],
    [gv.zona]: [],
    [gv.sucursal]: [],
    [gv.dm]: [],
    [gv.agente]: [],
  };
  SepararUsuarios() {
    for (let x = 0; x < gv.colaboradores.length; x++) {
      let Elementos_ID = this.gf.GetElementosDeID(gv.colaboradores[x][gv.ID_Ubicacion]);
      Elementos_ID[gv.nombre] = gv.colaboradores[x][gv.nombre];
      Elementos_ID[gv.tag] = gv.colaboradores[x][gv.tag];

      if (Elementos_ID[gv.ID_Ubicacion] === gv.region) {
        this.ArrUsers[gv.region].push(Elementos_ID);

      } else
        if (Elementos_ID[gv.ID_Ubicacion] === gv.zona) {
          this.ArrUsers[gv.zona].push(Elementos_ID);

        } else
          if (Elementos_ID[gv.ID_Ubicacion] === gv.sucursal) {
            this.ArrUsers[gv.sucursal].push(Elementos_ID);

          } else
            if (Elementos_ID[gv.ID_Ubicacion] === gv.dm) {
              this.ArrUsers[gv.dm].push(Elementos_ID);

            } else
              if (Elementos_ID[gv.ID_Ubicacion] === gv.agente) {
                this.ArrUsers[gv.agente].push(Elementos_ID);
              }
      console.log("Usuarios separados")
      console.log(this.ArrUsers);
    }
  }

  //CLIENTES
  Cliente = {
    Nombre: '',
    ApellidoP: '',
    ApellidoM: '',
    Calle: '',
    NumeroExt: '',
    NumeroInt: '',
    Colonia: '',
    Municipio: '',
    Estado: '',
    Telefono: '',
    CURP: '',
    Cumpleanos: '',
    Sexo: '',
    Edo_Nacimiento: '',
    Sector: '',
    CP: '',
    Identificador: '',

    ID_Ubicacion: '',
  }
  Incomplete = false;
  Info_Cliente;
  GetCurp() {
    if (this.Cliente.ApellidoP !== '' && this.Cliente.ApellidoM !== '' && this.Cliente.Nombre !== '' &&
      this.Cliente.Sexo !== '' && this.Cliente.Cumpleanos !== '' && this.Cliente.Edo_Nacimiento !== '') {
      let fecha = new Date(this.Cliente.Cumpleanos)

      this.Cliente.CURP = this.gf.GetCURP(this.Cliente.ApellidoP, this.Cliente.ApellidoM, this.Cliente.Nombre,
        fecha, this.Cliente.Sexo.charAt(0), this.Cliente.Edo_Nacimiento)
    }

  }
  AgregarClientes() {

    this.Incomplete = false;
    this.btn_disabled = true;

    if (this.Cliente.Identificador === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa un numero de cliente";
      this.btn_disabled = false;
      return;
    }

    let cliente = gv.clientes.filter(cliente => {
      return cliente[gv.identificador] === this.Cliente.Identificador;
    });

    if (!gv.DT_Clientes) {
      this.Incomplete = true;
      this.AlertText = "Espera a que carguen los usuarios";
      this.btn_disabled = false;
      return;
    }

    if (this.Tipo === gv.Nuevo && cliente[0] !== undefined) {
      this.Incomplete = true;
      this.AlertText = "Ya hay un usuario con ese identificador";
      this.btn_disabled = false;
      return;
    }

    if (this.Cliente.Nombre === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa un nombre";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.ApellidoP === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa un apellido paterno";
      this.btn_disabled = false;
      return;
    }

    if (this.Cliente.Calle === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa la calle";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.NumeroExt === '' && this.Cliente.NumeroInt === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa numero interior o exterior o ambos";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.Colonia === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa un colonia de residencia";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.Municipio === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa un municipio de residencia";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.Estado === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa el estado de residencia";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.CP === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa un codigo postal";
      this.btn_disabled = false;
      return;
    }

    if (this.Cliente.Telefono === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa un telefono";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.CURP === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa un CURP";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.Cumpleanos === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa la fecha de nacimiento";
      this.btn_disabled = false;
      return;
    }
    if (this.Cliente.Sexo === '') {
      this.Incomplete = true;
      this.AlertText = "Ingresa el sexo de la persona";
      this.btn_disabled = false;
      return;
    }

    if (this.Cliente.ApellidoM === '') {
      this.Cliente.ApellidoM = ' ';
    }
    if (this.Cliente.NumeroInt === '') {
      this.Cliente.NumeroInt = ' ';
    }

    this.gf.NuevoCliente(this.Cliente.Nombre + '#' + this.Cliente.ApellidoP + '#' + this.Cliente.ApellidoM,
      this.Cliente.Calle + '#' + this.Cliente.NumeroExt + '#' + this.Cliente.NumeroInt + '#' + this.Cliente.Colonia + '#' +
      this.Cliente.Municipio + '#' + this.Cliente.Estado + '#' + this.Cliente.CP,
      this.Cliente.Telefono, this.Cliente.CURP, this.Cliente.Cumpleanos, this.Cliente.Sexo, this.Cliente.Identificador,
      parseInt(this.Cliente.ID_Ubicacion))
      .then(res => {
        if (res) {
          this.closeModal();
        } else {

        }
      })
  }
  ChecEncargado() {
    console.log(this.Cliente.ID_Ubicacion)
    console.log(gv.colaboradores)
  }

  //PAGOS
  ProximosArr = [];
  PagosArr = [];
  Info_Credito = [];
  In = {
    Posponer: {
      Date: '',
      Razon: '',
      Hora: ''
    },

    Liquidar: {
      Cantidad: ''
    },
    Re_Estructurar: {
      Pago: '',
      Period: '',
      Date: ''
    },
    Agregar_pagos: {
      Pagos: '',
      Pago: ''
    },
  }
  Key_Primer_Pago;
  Selection = 'Posponer';
  Btn_Txt = 'Posponer';
  Cambio() {
    switch (this.Selection) {
      case 'Posponer':
        this.Btn_Txt = 'Posponer pago'
        break;
      case 'Liquidar':
        this.Btn_Txt = 'Liquidar credito'
        break;
      case 'Re estructurar':
        this.Btn_Txt = 'Re estructurar credito'
        break;
      case 'Agregar pagos':
        this.Btn_Txt = 'Agregar pagos'
        break;
      case 'Eliminar credito':
        this.Btn_Txt = 'Eliminar credito'
        break;
    }
  }
  PayCredit() {
    this.Incomplete = false;
    this.btn_disabled = true;

    switch (this.Selection) {
      case 'Posponer':
        if (this.In.Posponer.Date === '' || this.In.Posponer.Razon === '') {
          this.Incomplete = true;
          this.AlertText = 'Falta información'
          this.btn_disabled = false;
          return;
        }

        let fecha = new Date(this.In.Posponer.Date);

        this.gf.PosponerPago(this.ProximosArr[0], gv.usuario[gv.nombre], fecha, this.In.Posponer.Razon)
          .then(res => {
            if (res) {

              this.modalCtrl.dismiss({
                'dismissed': true
              });

            } else {

            }
            this.btn_disabled = false;
          });

        break;

      case 'Liquidar':
        if (this.In.Liquidar.Cantidad === '') {
          this.Incomplete = true;
          this.AlertText = 'Falta información'
          this.btn_disabled = false;
          return;
        }
        this.gf.LiquidarCredito(this.PagosArr, gv.usuario[gv.nombre], parseInt(this.In.Liquidar.Cantidad),
          this.PagosArr[0], this.ProximosArr[0])
          .then(res => {
            if (res) {
              this.modalCtrl.dismiss({
                'dismissed': true
              });
            } else {
              this.btn_disabled = false;
            }
          });
        break;

      case 'Re estructurar':
        if (this.In.Re_Estructurar.Pago === '' || this.In.Re_Estructurar.Period === '' || this.In.Re_Estructurar.Date === '') {
          this.Incomplete = true;
          this.AlertText = 'Falta información'
          this.btn_disabled = false;
          return;
        }

        if (this.ProximosArr.length === this.PagosArr.length) {
          this.gf.Toast("No se puede reestructurar el primer pago elimina el credito e ingresa uno nuevo", 2000);
          this.btn_disabled = false;
          return;
        }

        let fecha_restructura = new Date(this.In.Re_Estructurar.Date);

        this.gf.ReestructurarCredito(this.ProximosArr[0], parseInt(this.In.Re_Estructurar.Pago), this.In.Re_Estructurar.Period,
          this.PagosArr, fecha_restructura)
          .then(res => {
            if (res) {
              this.modalCtrl.dismiss({
                'dismissed': true
              });
            } else {
              this.btn_disabled = false;
            }
          });
        break;

      case 'Agregar pagos':
        if (this.In.Agregar_pagos.Pagos === '' || this.In.Agregar_pagos.Pago === '') {
          this.Incomplete = true;
          this.AlertText = 'Falta información'
          this.btn_disabled = false;
          return;
        }
        this.gf.AgregarPagosMulta(this.PagosArr, parseInt(this.In.Agregar_pagos.Pagos), parseInt(this.In.Agregar_pagos.Pago))
          .then(res => {
            if (res) {
              this.modalCtrl.dismiss({
                'dismissed': true
              });
            } else {
              this.btn_disabled = false;
            }
          });
        break;

      case 'Eliminar credito':
        this.gf.EliminarCredito(this.PagosArr)
          .then(res => {
            if (res) {
              this.modalCtrl.dismiss({
                'dismissed': true
              });
            } else {
              this.btn_disabled = false;
            }
          });
        break;

    }
  }

  //AVAL
  Aval = {
    Nombre: '',
    ApellidoP: '',
    ApellidoM: '',

    Calle: '',
    NumeroExt: '',
    NumeroInt: '',
    Colonia: '',
    Municipio: '',
    Estado: '',

    Telefono: '',
    CURP: '',
    Cumpleanos: '',
    Sexo: '',
    Edo_Nacimiento: '',
    Sector: '',
    CP: '',
  }
  AgregarAval() {

    gv.AvalArr.push({
      [gv.direccion]: this.Aval.Calle + '#' + this.Aval.NumeroExt + '#' + this.Aval.NumeroInt + '#' + this.Aval.Colonia + '#' +
        this.Aval.Municipio + '#' + this.Aval.Estado,
      [gv.nombre]: this.Aval.Nombre + '#' + this.Aval.ApellidoP + '#' + this.Aval.ApellidoM,
      [gv.telefono]: this.Aval.Telefono,
      [gv.curp]: this.Aval.CURP,
      [gv.nacimiento]: this.Aval.Cumpleanos,
      [gv.sexo]: this.Aval.Sexo
    });

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  //PRODUCTO
  Producto = {
    Credito: '',
    Total_Pagos: '',
    Pago: '',
    Total_Credito: 0,
    Efectivo: '',
    Periodo: '',
  }
  AgregarProducto() {
    this.gf.AgregarProducto(parseInt(this.Producto.Credito), parseInt(this.Producto.Total_Pagos), this.Producto.Periodo, parseInt(this.Producto.Pago),
      this.Producto.Total_Credito, parseInt(this.Producto.Efectivo));
  }
  CambioPagoNum(Pago, Num_Pagos) {
    if (Pago === '') {
      Pago = '0';
    }
    if (Num_Pagos === '') {
      Num_Pagos = '0';
    }

    this.Producto.Total_Credito = parseInt(Pago) * parseInt(Num_Pagos);
  }

}

export const gv = {
    //FIREBASE PATHS
    FB_Clientes: 'clientes',
    FB_Pagos: 'pagos',
    FB_Usuarios: 'usuarios',
    FB_Organizaciones: 'organizaciones',
    FB_OrgInfo: 'info',
    FB_Catalogo: 'catalogo',
    FB_Productos: 'productos',

    //DATALOADED
    DT_Clientes: false,
    DT_Pagos: false,


    plan: 'plan',

    //USUARIO
    clientes: [],
    nombre: 'n',
    mail: 'ma',
    sexo: 'se', Hombre: 'Hom', Mujer: 'Muj',
    direccion: 'dir',
    telefono: 'tel',
    curp: 'curp',
    nacimiento: 'nac',
    aval: 'aval',
    identificador: 'id',
    password: 'pass',
    organizacion: 'org',
    modificado_por: 'mod_por',

    //INFO CREDITOS
    pagos_Arr: [],
    deposito: 'dep', representante: 'rep', oficina: 'of', banco: 'ban',
    status: 'est', status_proximo: 'Proximo', status_vencido: 'Vencido', status_pagado: 'Pagado', status_parcial: 'Parcial',
    num_pago: 'num_pago',
    key_creador: 'k_c',
    total_pagos: 't_p',
    efectivo: 'eff',
    credito: 'can',
    pago: 'pag',
    periodo: 'per', mensual: 'men', quincenal: 'quin', semanal: 'sem', diario: 'dia',
    fecha: 'fech',
    total_credito: 'to_cr',
    key: 'key',
    cantidad_pagado: 'ca_pa',
    multa: 'mul',
    dia_cobro: 'di_co',
    cobrado_por: 'co_por',
    key_primer_pago: 'k_p_p',
    pagos_faltantes: 'pa_fal',
    cantidad_por_pagar: 'c_p_p',
    explicacion: 'exp',
    garantias: 'gar', articulo: 'art', marca: 'mar',
    folio: 'fol',
    vivienda: 'viv', propia: 'prop', prestada: 'pres', renta: 'rent',
    antiguedad: 'ant',
    ocupacion: 'ocu', ama_de_casa: 'ama', empleado: 'emp', comerciante: 'comer',

    //INFO USUARIOS
    usuario: {},
    colaboradores: [],
    roll: 'roll', Administrador: 'admin', Cobrador: 'cob', Oficina: 'off', Dueno: 'duen',

    info: 'info',
    Nuevo: 'nue',
    Actualizar: 'Act',
    AvalArr: [],


    ClienteToCreditoInfo: [],
};

export var ClientesSubscribe;

export var estados = ["aguascalientes","baja california","baja california sur","campeche","chiapas","chihuahua","coahuila","colima",
"ciudad de mexico","distrito federal","durango","guanajuato","guerrero","hidalgo","jalisco","estado de mexico","michoacan",
"morelos","nayarit","nuevo leon","oaxaca","puebla","queretaro","quintana roo","san luis potosi","sinaloa","sonora","tabasco",
"tamaulipas","tlaxcala","veracruz","yucatan","zacatecas"];

export var abreviacion = ["AS","BC","BS","CC","CS","CH","CL","CM","CX","DF","DG","GT","GR","HG","JC","MC","MN","MS","NT",
"NL","OC","PL","QT","QR","SP","SL","SR","TC","TS","TL","VZ","YN","ZS"];

export var Estados = [{
    'Aguascalientes': "AS",
    'Baja California': "BC",
    'Baja California Sur': "BS",
    'Campeche': "CC",
    'Chiapas': "CS",
    'Chihuahua': "CH",
    'Coahuila': "CL",
    'Colima': "CM",
    'Ciudad de mexico': "CX",
    'Distrito federal': "DF",
    'Durango': "DG",
    'Guanajuato': "GT",
    'Guerrero': "GR",
    'Hidalgo': "HG",
    'Jalisco': "JC",
    'Estado de Mexico': "MC",
    'Michoacan': "MN",
    'Morelos': "MS",
    'Nayarit': "NT",
    'Nuevo Leon': "NL",
    'Oaxaca': "OC",
    'Puebla': "PL",
    'Queretaro': "QT",
    'Quintana Roo': "QR",
    'San Luis Potosi': "SP",
    'Sinaloa': "SL",
    'Sonora': "SR",
    'Tabasco': "TC",
    'Tamaulipas': "TS",
    'Tlaxcala': "TL",
    'Veracruz': "VZ",
    'Yucatan': "YN",
    'Zacatecas': "ZS" 
}]
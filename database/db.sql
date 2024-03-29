create database TorreFuerte;

USE TorreFuerte;


create table Personas(
	id_persona int auto_increment not null,
    nombres_persona varchar(100) not null,
    a_paterno varchar(50) not null,
    a_materno varchar(50) not null,
    calle varchar(150) not null,
    numero_casa varchar(10) not null,
    colonia varchar(100) not null,
    num_tel varchar(13) not null,
    primary key(id_persona)
);

create table Impactista(
	id_impactista int auto_increment not null,
    id_personaImp int not null,
    nombresImp varchar(100) not null,
    a_paternoImp varchar(50) not null,
    a_maternoImp varchar(50) not null,
    num_tel int not null,
    linea_pert int not null,
    temaImp varchar(20) not null,
    pagos int not null,
    invitado_por varchar(200) not null,
    primary key(id_impactista)
);

create table Inventario(
	id_pro_inv int auto_increment not null,
    nombre_pro varchar(200) not null,
    cantidad_nec int not null,
    cantidad_inicial int not null,
    cantidad_sembrada int default 0,
    descripcion_cant varchar(10) not null,
    genero varchar(50),
    completo boolean,
    primary key(id_pro_inv)
);

create table Producto(
	id_producto int auto_increment not null,
    nom_producto varchar(100),
    cantidad varchar(100),
    primary key(id_producto)
);

create table Siembra (
	id_siembra int auto_increment not null,
    id_prod_inv int not null,
    nom_productoSi varchar(100) not null,
    cantidad_promesa int not null,
    cantidad_donar int,
    descripcion_cant_p varchar(10),
    descripcion_cant_d varchar(10),
    genero_producto varchar(50),
    id_personaSi int not null,
    nombresSi varchar(100) not null,
    a_paterno varchar(50) not null,
    a_materno varchar(50) not null,
    num_tel varchar(13) not null,
    nom_recibe varchar(100) not null,
    fecha_recibe date not null ,
    recibido boolean,
    primary key(id_siembra),
    foreign key(id_personaSi) references Personas(id_persona),
    foreign key(id_prod_inv) references Inventario(id_pro_inv)
);

create table Registro_siembra (
    id_registro int auto_increment not null,
    id_siembra_r int not null,
    id_prod_inv int not null,
    nom_productoSi varchar(100) not null,
    cantidad_promesa int not null,
    cantidad_donar int,
    descripcion_cant_p varchar(10),
    descripcion_cant_d varchar(10),
    genero_producto varchar(50),
    id_personaSi int not null,
    nombresSi varchar(100) not null,
    a_paterno varchar(50) not null,
    a_materno varchar(50) not null,
    num_tel varchar(13) not null,
    nom_recibe varchar(100) not null,
    fecha_recibe date not null ,
    recibido boolean,
    primary key(id_registro),
    foreign key(id_personaSi) references Personas(id_persona),
    foreign key(id_siembra_r) references Siembra(id_siembra),
    foreign key(id_prod_inv) references Inventario(id_pro_inv)
); 

show tables;
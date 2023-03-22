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

create table Producto(
	id_producto int auto_increment not null,
    nom_producto varchar(100),
    primary key(id_producto)
);

create table Siembra (
	id_siembra int auto_increment not null,
    id_productoSi int,
    nom_productoSi varchar(100) not null,
    id_personaSi int,
    nombresSi varchar(100) not null,
    a_paterno varchar(50) not null,
    a_materno varchar(50) not null,
    cantidad int not null,
    recibe varchar(100) not null,
    fecha_recibe varchar(20),
    primary key(id_siembra),
    foreign key(id_productoSi) references Producto(id_producto),
    foreign key(id_personaSi) references Personas(id_persona)
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
    id_productoRecibido int not null,
    nombre_pro varchar(200) not null,
    cantidad int not null,
    genero varchar(50),
    primary key(id_pro_inv),
    foreign key(id_productoRecibido) references Producto(id_producto)
);

show tables;
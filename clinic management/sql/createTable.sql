create database clinic;
use clinic

create table patient (
    pID varchar(5) primary key,
    pName varchar(20)
);

create table doctor (
    dID varchar(5) primary key,
    dName varchar(20),
    dType varchar(10) check (dType like "associated" or dType like "visiting")
);

create table receipt (
    pID varchar(5) references patient(pID),
    fee int,
    visitDate date
);

create table prescription (
    pID varchar(5) references patient(pID),
    visitDate date,
    meds varchar(100),
    fromClinic boolean
);

create table history (
    pID varchar(5) references patient(pID),
    dID varchar(5) references doctor(dID),
    visitDate date,
    symptomps varchar(200),
    diagnosis varchar(200),
    meds varchar(100)
);
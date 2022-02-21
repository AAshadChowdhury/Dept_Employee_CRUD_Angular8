sp_help department;
go
Drop table department
Go
Drop table sections
go
Drop table employees
go
 sp_help __EFMigrationsHistory;
 Go
 drop table __EFMigrationsHistory
 select * from __EFMigrationsHistory
 delete from __EFMigrationsHistory where migrationid='20220215040950_finalproject'

 Alter table employees
 Drop Column employeeid
 alter table employees drop constraint [PK_employees];
alter table employees drop column employeeid;

 go
sp_help sections;

insert into categories values (1,'programming','Idb')
insert into categories values ('cat-1','mathematics','CU')

insert into books values ('Book-1','Set Theory','cat-1',20,20,'true','2020/12/12','ss')
drop table employees
drop table department
drop table sections
Go
sp_help employees
Go
sp_help department

insert into department values ('D-01','Bangla','Ctg')

select * from department

insert into sections values ('S-01',7,'10:00','12:00')
insert into sections values ('S-02',6,'12:00','11:00')
insert into sections values ('S-03',5,'12:00','11:00')

select * from sections
insert into employees values ('I-001',12,'karim','D-01','S-01','A','BoalKhali','karim Ullah',120123655,'2021/12/12','MS Admit card.jpg','true')

select * from employees 

Go
Sp_help employees

select * from registrations
insert into registrations values('jamal','123','Admin','aa@aa.com')
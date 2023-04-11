/*
SQL DDL's USED TO CREATE THE TABLES

4) Implement the database according to your relational database schema and the constraints that you have defined.
*/

CREATE TABLE HotelChain (
                            ChainID CHAR(5) NOT NULL UNIQUE,
                            Name VARCHAR(40) NOT NULL,
                            OfficeAddress VARCHAR(50) NOT NULL,
                            NumberOfHotels NUMERIC check (NumberOfHotels >= 0)  NOT NULL,
                            ContactEmail VARCHAR(40) NOT NULL UNIQUE,
                            PhoneNumber CHAR(10) NOT NULL UNIQUE,
                            PRIMARY KEY(ChainID)
);

CREATE TABLE Hotel (
                       HotelID CHAR(5) NOT NULL UNIQUE,
                       ChainID CHAR(5) NOT NULL,
                       Category INTEGER check ( Category>=1 and Category<=5 ) NOT NULL,
                       NumOfRooms NUMERIC check (NumOfRooms >= 0)  NOT NULL,
                       Address VARCHAR(50) NOT NULL,
                       ContactEmail VARCHAR(40) NOT NULL,
                       PhoneNumber CHAR(10) NOT NULL,
                       PRIMARY KEY (HotelID),
                       FOREIGN KEY (ChainID) REFERENCES HotelChain(ChainID) ON DELETE CASCADE
);

CREATE TABLE Room (
                      RoomID CHAR(5) NOT NULL UNIQUE,
                      HotelID CHAR(5) NOT NULL,
                      RoomNumber NUMERIC(20) NOT NULL,
                      Price NUMERIC(20) NOT NULL check (Price >= 0)  NOT NULL,
                      Amenities VARCHAR(100) NOT NULL,
                      Capacity NUMERIC(20) NOT NULL check (Price > 0)  NOT NULL,
                      SeaView BOOLEAN NOT NULL,
                      MountainView BOOLEAN NOT NULL,
                      Extendable BOOLEAN NOT NULL,
                      Damages BOOLEAN NOT NULL,
                      PRIMARY KEY(RoomID),
                      FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE
);


CREATE TABLE Customer (
                          CustomerID SERIAL NOT NULL UNIQUE,
                          Email VARCHAR(40) NOT NULL UNIQUE,
                          Password VARCHAR(40) NOT NULL,
                          FullName VARCHAR(40) NOT NULL,
                          Address VARCHAR(50) NOT NULL,
                          SSN CHAR(9) NOT NULL  CHECK( length(SSN)=9 ) UNIQUE,
                          DateOfRegistration DATE NOT NULL,
                          PRIMARY KEY(CustomerID)
);

CREATE TABLE Positions (
                           PositionID SERIAL NOT NULL UNIQUE,
                           PositionName VARCHAR(40) NOT NULL,
                           PRIMARY KEY (PositionID)
);

CREATE TABLE Employee (
                          EmployeeID SERIAL NOT NULL UNIQUE ,
                          Email VARCHAR(40) NOT NULL  ,
                          Password VARCHAR(40) NOT NULL,
                          HotelID CHAR(5) NOT NULL,
                          FullName VARCHAR(40) NOT NULL,
                          Address VARCHAR(50) NOT NULL,
                          SSN CHAR(9) NOT NULL CHECK( length(SSN)=9 ) ,
                          PRIMARY KEY (EmployeeID),
                          FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE

);
CREATE TABLE EmployeePosition (
                                  EmployeeID SERIAL NOT NULL,
                                  PositionID SERIAL NOT NULL,
                                  PRIMARY KEY (EmployeeID, PositionID),
                                  FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE,
                                  FOREIGN KEY (PositionID) REFERENCES Positions(PositionID) ON DELETE CASCADE
);
CREATE TABLE Renting (
                         RentingID SERIAL NOT NULL UNIQUE ,
                         HotelID CHAR(5) NOT NULL,
                         RoomID CHAR(5) NOT NULL,
                         CustomerID SERIAL NOT NULL,
                         CheckinDate DATE NOT NULL,
                         CheckoutDate DATE NOT NULL  check ( CheckoutDate > CheckinDate ),
                         PRIMARY KEY(RentingID),
                         FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE,
                         FOREIGN KEY (RoomID) REFERENCES Room(RoomID) ON DELETE CASCADE,
                         FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);


CREATE TABLE Archive (
                         ArchiveID SERIAL NOT NULL UNIQUE ,
                         IsBooking BOOLEAN NOT NULL,
                         ArchivedID CHAR(5) NOT NULL,
                         HotelID CHAR(5) NOT NULL,
                         RoomID CHAR(5) NOT NULL,
                         CustomerID SERIAL NOT NULL,
                         BookingDate DATE, --can be null since rentings don't have booking dates
                         CheckinDate DATE NOT NULL,
                         CheckoutDate DATE NOT NULL  check ( CheckoutDate > CheckinDate ),
                         PRIMARY KEY(ArchiveID)
);

CREATE TABLE Booking (
                         BookingID SERIAL NOT NULL UNIQUE ,
                         HotelID CHAR(5) NOT NULL,
                         RoomID CHAR(5) NOT NULL,
                         CustomerID SERIAL NOT NULL,
                         BookingDate DATE NOT NULL,
                         CheckinDate DATE NOT NULL,
                         CheckoutDate Date NOT NULL  check ( CheckoutDate > CheckinDate ),
                         PRIMARY KEY (BookingID),
                         FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE,
                         FOREIGN KEY (RoomID) REFERENCES Room(RoomID) ON DELETE CASCADE,
                         FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);
CREATE TABLE Cities (
    City varchar(20) NOT NULL unique
);

--      Trigger1 Creation       --
CREATE FUNCTION increment_num_of_rooms()
    RETURNS TRIGGER AS $increment_num_of_rooms$
BEGIN
    UPDATE Hotel
    SET NumOfRooms = NumOfRooms + 1
    WHERE HotelID = NEW.HotelID;
    RETURN NEW;
END;

$increment_num_of_rooms$ LANGUAGE plpgsql;

CREATE TRIGGER increment_num_of_rooms_trigger
    AFTER INSERT ON Room
    FOR EACH ROW
EXECUTE FUNCTION increment_num_of_rooms();
--      Trigger1 Creation       --


--      Trigger2 Creation       --
CREATE FUNCTION increment_num_of_hotels()
    RETURNS TRIGGER AS $increment_num_of_hotels$
BEGIN
    UPDATE HotelChain
    SET numberofhotels = numberofhotels + 1
    WHERE chainid = NEW.chainid;
    RETURN NEW;
END;

$increment_num_of_hotels$ LANGUAGE plpgsql;

CREATE TRIGGER increment_num_of_hotels_trigger
    AFTER INSERT ON hotel
    FOR EACH ROW
EXECUTE FUNCTION increment_num_of_hotels();
--      Trigger2 Creation       --


--      Views Creation       --
CREATE VIEW Available_Rooms AS
    Select subView2.City as id, count(*) as numRoomsAvailable from
        (Select * from
            ((room natural join hotel) left join Cities on Address LIKE concat('%',Cities.City,'%')) as subView1
         where subView1.RoomID not in (select booking.roomid from booking)
           AND subView1.RoomID not in (select booking.roomid from booking)
        )
            as subView2 group by subView2.City;

CREATE VIEW Hotels_Capacity AS
    Select subView2.Name, subView2.address as id, sum(subView2.Capacity) as capacity from
        (SELECT * from
            ((room natural join hotel) left join hotelchain on Hotel.ChainID = HotelChain.ChainID) as subview1
         where subView1.RoomID not in (select booking.roomid from booking)
           AND subView1.RoomID not in (select booking.roomid from booking)
        )
            as subView2 group by subView2.address, subView2.name ;
--      Views Creation       --


--      Index creation      --
CREATE INDEX idx_room_hotel_id ON Room (HotelID);
CREATE INDEX idx_hotel_hotel_id ON Hotel(HotelID);
CREATE INDEX idx_booking_customer_id ON Booking(CustomerID);
--      Index creation      --



/*
SQL INSERTS

5) Insert in your database data for each one of the 5 hotel chains. Each one of them has at
least 8 hotels, which belong to at least 3 categories. Two of the hotels at least should be in the
same area. Each hotel should have at least 5 rooms of different capacity
*/


INSERT INTO HotelChain VALUES
                           ('00001','Marriott', '456 Main Ave, Portland, USA 97209', 8, 'contact@marriot.com', '5409823547'),
                           ('00002','Hilton', '16 Hawk Lane, Chicago, USA, 39427', 8, 'hello@hilton.com', '6236306193'),
                           ('00003','Fairmont', '173 Romane St, New York, USA, 92649', 8, 'fairmont@contact.com', '3432003847'),
                           ('00004','Galaxy', '73 Fairy St, Miami, USA 33130', 8, 'galaxy@fly.com', '3045849385'),
                           ('00005', 'Refresh Resort', '1 Heavenly St, Charleston, USA 29403', 8, 'contact@refresh.com', '3035849385');


INSERT INTO Hotel VALUES
                      ('11001', '00001', 3, 0, '123 Main St, Springfield, USA 62704', 'contactspring@marriot.com', '5551234567'),
                      ('11002', '00001', 4, 0, '456 Oak Ave, Portland, USA 97209', 'contactoak@marriot.com', '5552345678'),
                      ('11003', '00001', 2, 0, '789 Elm St, Charleston, USA 29403', 'contactelm@marriot.com', '5553456789'),
                      ('11004', '00001', 5, 0, '321 Maple Dr, Austin, USA 78753', 'contactmaple@marriot.com', '5554567890'),
                      ('11005', '00001', 3, 0, '987 Pine St, Miami, USA 33130', 'contactpine@marriot.com', '5555678901'),
                      ('11006', '00001', 4, 0, '2468 Market St, San Francisco, USA 94114', 'contactmarket@marriot.com', '5556789012'),
                      ('11007', '00001', 2, 0, '1357 Broadway, New York, USA 10018', 'contactbroadway@marriot.com', '5557890123'),
                      ('11008', '00001', 5, 0, '3699 Wilshire Blvd, Los Angeles, USA 90010', 'contactwilshire@marriot.com', '5558901234'),

                      ('12001', '00002', 3, 0, '2345 Cherry Lane, Seattle, USA 98101', 'hellocherry@hilton.com', '5551234568'),
                      ('12002', '00002', 4, 0, '6789 Oakwood Dr, Denver, USA 80209', 'hellooakwood@hilton.com', '5552345679'),
                      ('12003', '00002', 2, 0, '1111 Peachtree St, Atlanta, USA 30309', 'hellopeachtree@hilton.com', '5553456790'),
                      ('12004', '00002', 5, 0, '2222 Walnut St, Philadelphia, USA 19103', 'hellowalnut@hilton.com', '5554567891'),
                      ('12005', '00002', 3, 0, '3333 State St, Chicago, USA 60610', 'hellostate@hilton.com', '5555678902'),
                      ('12006', '00002', 4, 0, '4444 Market St, San Diego, USA 92102', 'hellomarket@hilton.com', '5556789013'),
                      ('12007', '00002', 2, 0, '5555 Sunset Blvd, Hollywood, USA 90028', 'info@hotel7.com', '5557890124'),
                      ('12008', '00002', 4, 0, '6666 Lombard St, San Francisco, USA 94111', 'hellolombard@hilton.com', '5556789013'),

                      ('13001', '00003', 3, 0, '7777 Central Park, New York, USA 10019', 'fairmontcentral@contact.com', '5551234569'),
                      ('13002', '00003', 4, 0, '8888 Rodeo Dr, Beverly Hills, USA 90210', 'fairmontrodeo@contact.com', '5552345680'),
                      ('13003', '00003', 2, 0, '9999 Huntington Ave, Boston, USA 02115', 'fairmonthuntington@contact.com', '5553456791'),
                      ('13004', '00003', 5, 0, '10000 Lincoln Ave, Miami, USA 33139', 'fairmontlincoln@contact.com', '5554567892'),
                      ('13005', '00003', 3, 0, '11000 Melrose Ave, Los Angeles, USA 90048', 'fairmontmelrose@contact.com', '5555678903'),
                      ('13006', '00003', 4, 0, '12000 Ventura Blvd, Sherman Oaks, USA 91423', 'fairmontventura@contact.com', '5556789014'),
                      ('13007', '00003', 2, 0, '13000 Sunset Blvd, Hollywood, USA 90027', 'fairmontsunset@contact.com', '5557890125'),
                      ('13008', '00003', 5, 0, '14000 Wilshire Blvd, Beverly Hills, USA 90212', 'fairmontwilhshire@contact.com', '5558901236'),

                      ('14001', '00004', 3, 0, '15000 Santa Monica Blvd, Los Angeles, USA 90035', 'galaxysantamonica@fly.com', '5551234570'),
                      ('14002', '00004', 4, 0, '16000 Pico Blvd, Santa Monica, USA 90405', 'galaxypico@fly.com', '5552345681'),
                      ('14003', '00004', 2, 0, '17000 Colorado Blvd, Pasadena, USA 91106', 'galaxycolorado@fly.com', '5553456792'),
                      ('14004', '00004', 5, 0, '18000 Mulholland Dr, Los Angeles, USA 90272', 'galaxymulholland@fly.com', '5554567893'),
                      ('14005', '00004', 3, 0, '19000 Magnolia Blvd, Burbank, USA 91505', 'galaxymagnolia@fly.com', '5555678904'),
                      ('14006', '00004', 4, 0, '20000 Pacific Coast Hwy, Malibu, USA 90265', 'galaxypacificcoast@fly.com', '5556789015'),
                      ('14007', '00004', 2, 0, '21000 Topanga Canyon Blvd, Chatsworth, USA 91311', 'galaxytopangacanyon@fly.com', '5557890126'),
                      ('14008', '00004', 5, 0, '22000 S Figueroa St, Los Angeles, USA 90007', 'galaxyfigueroa@fly.com', '5558907382'),

                      ('15001', '00005', 3, 0, '7666 Central Park, New York, USA 10019', 'contactcarson@refresh.com', '5551234571'),
                      ('15002', '00005', 4, 0, '24000 Imperial Hwy, Downey, USA 90242', 'contactimperial@refresh.com', '5552345682'),
                      ('15003', '00005', 2, 0, '25000 San Fernando Rd, Santa Clarita, USA 91321', 'contactsanfernando@refresh.com', '5553456793'),
                      ('15004', '00005', 5, 0, '26000 N Western Ave, San Pedro, USA 90731', 'contactwestern@refresh.com', '5554567894'),
                      ('15005', '00005', 3, 0, '27000 E Washington Blvd, Pasadena, USA 91107', 'contactwashington@refresh.com', '5555678905'),
                      ('15006', '00005', 4, 0, '28000 Olympic Blvd, Santa Monica, USA 90404', 'contactolympic@refresh.com', '5556789016'),
                      ('15007', '00005', 2, 0, '29000 Van Nuys Blvd, Sherman Oaks, USA 91403', 'contactvannuys@refresh.com', '5557890127'),
                      ('15008', '00005', 5, 0, '30000 Beverly Blvd, Los Angeles, USA 90048', 'contactbeverly@refresh.com', '5558901234');



INSERT INTO Room VALUES
-- HotelChain 00001
-- Hotel 11001
('20001', '11001', 100, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
('20002', '11001', 200, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20003', '11001', 300, 100, 'TV, WiFi', 1, false, true, false, false),
('20004', '11001', 400, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20005', '11001', 500, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 11002
('20006', '11002', 100, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, true),
('20007', '11002', 200, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20008', '11002', 300, 120, 'TV, WiFi', 1, false, true, false, true),
('20009', '11002', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20010', '11002', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, true),
-- Hotel 11003
('20011', '11003', 100, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20012', '11003', 200, 150, 'TV, WiFi', 1, false, true, false, false),
('20013', '11003', 300, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20014', '11003', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, true),
('20015', '11003', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 11004
('20016', '11004', 100, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20017', '11004', 200, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20018', '11004', 300, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20019', '11004', 400, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20020', '11004', 500, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel 11005
('20021', '11005', 100, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
('20022', '11005', 200, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20023', '11005', 300, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20024', '11005', 400, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20025', '11005', 500, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 11006
('20026', '11006', 100, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20027', '11006', 200, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20028', '11006', 300, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20029', '11006', 400, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20030', '11006', 500, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 11007
('20031', '11007', 100, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20032', '11007', 200, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20033', '11007', 300, 90, 'Air conditioning, TV', 1, false, true, false, false),
('20034', '11007', 400, 200, 'Air conditioning, TV', 2, true, false, true, false),
('20035', '11007', 500, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 11008
('20036', '11008', 100, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20037', '11008', 200, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20038', '11008', 300, 110, 'Air conditioning, TV', 1, false, true, false, false),
('20039', '11008', 400, 250, 'Air conditioning, TV', 2, true, false, true, false),
('20040', '11008', 500, 90, 'Air conditioning, TV', 1, false, false, false, false),

-- HotelChain 00002
-- Hotel 12001
('20101', '12001', 100, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
('20102', '12001', 200, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20103', '12001', 300, 100, 'TV, WiFi', 1, false, true, false, false),
('20104', '12001', 400, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20105', '12001', 500, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 12002
('20106', '12002', 100, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20107', '12002', 200, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20108', '12002', 300, 120, 'TV, WiFi', 1, false, true, false, false),
('20109', '12002', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20110', '12002', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 12003
('20111', '12003', 100, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20112', '12003', 200, 150, 'TV, WiFi', 1, false, true, false, false),
('20113', '12003', 300, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20114', '12003', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20115', '12003', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 12004
('20116', '12004', 100, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20117', '12004', 200, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20118', '12004', 300, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20119', '12004', 400, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20120', '12004', 500, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel 12005
('20121', '12005', 100, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
('20122', '12005', 200, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20123', '12005', 300, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20124', '12005', 400, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20125', '12005', 500, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 12006
('20126', '12006', 100, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20127', '12006', 200, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20128', '12006', 300, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20129', '12006', 400, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20130', '12006', 500, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 12007
('20131', '12007', 100, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20132', '12007', 200, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20133', '12007', 300, 90, 'Air conditioning, TV', 1, false, true, false, false),
('20134', '12007', 400, 200, 'Air conditioning, TV', 2, true, false, true, false),
('20135', '12007', 500, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 12008
('20136', '12008', 100, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20137', '12008', 200, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20138', '12008', 300, 120, 'Air conditioning, TV', 1, false, true, false, false),
('20139', '12008', 400, 250, 'Air conditioning, TV', 2, true, false, true, false),
('20140', '12008', 500, 90, 'Air conditioning, TV', 1, false, false, false, false),

-- HotelChain 00003
-- Hotel 13001
('20201', '13001', 100, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
('20202', '13001', 200, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20203', '13001', 300, 100, 'TV, WiFi', 1, false, true, false, false),
('20204', '13001', 400, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20205', '13001', 500, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 13002
('20206', '13002', 100, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20207', '13002', 200, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20208', '13002', 300, 120, 'TV, WiFi', 1, false, true, false, false),
('20209', '13002', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20210', '13002', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 13003
('20211', '13003', 100, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20212', '13003', 200, 150, 'TV, WiFi', 1, false, true, false, false),
('20213', '13003', 300, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20214', '13003', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20215', '13003', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 13004
('20216', '13004', 100, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20217', '13004', 200, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20218', '13004', 300, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20219', '13004', 400, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20220', '13004', 500, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel 13005
('20221', '13005', 100, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
('20222', '13005', 200, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20223', '13005', 300, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20224', '13005', 400, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20225', '13005', 500, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 13006
('20226', '13006', 100, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20227', '13006', 200, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20228', '13006', 300, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20229', '13006', 400, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20230', '13006', 500, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 13007
('20231', '13007', 100, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20232', '13007', 200, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20233', '13007', 300, 90, 'Air conditioning, TV', 1, false, true, false, false),
('20234', '13007', 400, 200, 'Air conditioning, TV', 2, true, false, true, false),
('20235', '13007', 500, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 13008
('20236', '13008', 100, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20237', '13008', 200, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20238', '13008', 300, 130, 'Air conditioning, TV', 1, false, true, false, false),
('20239', '13008', 400, 250, 'Air conditioning, TV', 2, true, false, true, false),
('20240', '13008', 500, 90, 'Air conditioning, TV', 1, false, false, false, false),

-- HotelChain 00004
-- Hotel 14001
('20301', '14001', 100, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
('20302', '14001', 200, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20303', '14001', 300, 100, 'TV, WiFi', 1, false, true, false, false),
('20304', '14001', 400, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20305', '14001', 500, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 14002
('20306', '14002', 100, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20307', '14002', 200, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20308', '14002', 300, 120, 'TV, WiFi', 1, false, true, false, false),
('20309', '14002', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20310', '14002', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 14003
('20311', '14003', 100, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20312', '14003', 200, 150, 'TV, WiFi', 1, false, true, false, false),
('20313', '14003', 300, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20314', '14003', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20315', '14003', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 14004
('20316', '14004', 100, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20317', '14004', 200, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20318', '14004', 300, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20319', '14004', 400, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20320', '14004', 500, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel 14005
('20321', '14005', 100, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
('20322', '14005', 200, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20323', '14005', 300, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20324', '14005', 400, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20325', '14005', 500, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 14006
('20326', '14006', 100, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20327', '14006', 200, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20328', '14006', 300, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20329', '14006', 400, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20330', '14006', 500, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 14007
('20331', '14007', 100, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20332', '14007', 200, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20333', '14007', 300, 90, 'Air conditioning, TV', 1, false, true, false, false),
('20334', '14007', 400, 200, 'Air conditioning, TV', 2, true, false, true, false),
('20335', '14007', 500, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 14008
('20336', '14008', 100, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20337', '14008', 200, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20338', '14008', 300, 140, 'Air conditioning, TV', 1, false, true, false, false),
('20339', '14008', 400, 250, 'Air conditioning, TV', 2, true, false, true, false),
('20340', '14008', 500, 90, 'Air conditioning, TV', 1, false, false, false, false),

-- HotelChain 00005
-- Hotel 15001
('20401', '15001', 100, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
('20402', '15001', 200, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20403', '15001', 300, 100, 'TV, WiFi', 1, false, true, false, false),
('20404', '15001', 400, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20405', '15001', 500, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 15002
('20406', '15002', 100, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20407', '15002', 200, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20408', '15002', 300, 120, 'TV, WiFi', 1, false, true, false, false),
('20409', '15002', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20410', '15002', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 15003
('20411', '15003', 100, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
('20412', '15003', 200, 150, 'TV, WiFi', 1, false, true, false, false),
('20413', '15003', 300, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
('20414', '15003', 400, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
('20415', '15003', 500, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 15004
('20416', '15004', 100, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20417', '15004', 200, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20418', '15004', 300, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
('20419', '15004', 400, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
('20420', '15004', 500, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel15005
('20421', '15005', 100, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
('20422', '15005', 200, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20423', '15005', 300, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20424', '15005', 400, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
('20425', '15005', 500, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 15006
('20426', '15006', 100, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20427', '15006', 200, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20428', '15006', 300, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
('20429', '15006', 400, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
('20430', '15006', 500, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 15007
('20431', '15007', 100, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20432', '15007', 200, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20433', '15007', 300, 90, 'Air conditioning, TV', 1, false, true, false, false),
('20434', '15007', 400, 200, 'Air conditioning, TV', 2, true, false, true, false),
('20435', '15007', 500, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 15008
('20436', '15008', 100, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
('20437', '15008', 200, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
('20438', '15008', 300, 150, 'Air conditioning, TV', 1, false, true, false, false),
('20439', '15008', 400, 250, 'Air conditioning, TV', 2, true, false, true, false),
('20440', '15008', 500, 90, 'Air conditioning, TV', 1, false, false, false, false);

INSERT INTO Cities VALUES
                       ('Atlanta'),
                       ('Austin'),
                       ('Beverly Hills'),
                       ('Boston'),
                       ('Charleston'),
                       ('Chicago'),
                       ('Denver'),
                       ('Hollywood'),
                       ('Los Angeles'),
                       ('Miami'),
                       ('New York'),
                       ('Philadelphia'),
                       ('Portland'),
                       ('San Diego'),
                       ('San Francisco'),
                       ('Seattle'),
                       ('Sherman Oaks'),
                       ('Springfield'),
                       ('Santa Monica'),
                       ('Pasadena'),
                       ('Burbank'),
                       ('Malibu'),
                       ('Chatsworth'),
                       ('Downey'),
                       ('Santa Clarita'),
                       ('San Pedro');

INSERT INTO positions VALUES
                          (DEFAULT, 'clerk'),
                          (DEFAULT, 'receptionist'),
                          (DEFAULT, 'developer'),
                          (DEFAULT, 'house keeper'),
                          (DEFAULT, 'manager'),
                          (DEFAULT, 'HR represantative');


INSERT INTO employee VALUES
                         (DEFAULT, 'employee1@admin.com', '12345', '11001', 'Asad Ahmed', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee2@admin.com', '12345', '11002', 'Fatima Khan', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee3@admin.com', '12345', '11003', 'Youssef Belhaj', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee4@admin.com', '12345', '11004', 'Ivan Petrov', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee5@admin.com', '12345', '11005', 'Elena Ivanova', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee6@admin.com', '12345', '11006', 'Pedro Hernandez', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee7@admin.com', '12345', '11007', 'Yan Li', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee8@admin.com', '12345', '11008', 'Ying Yang', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee9@admin.com', '12345', '12001', 'Mehreen Hassan', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee10@admin.com', '12345', '12002', 'Rabia Malik', '143 Jonathon St', 163349846),
                         (DEFAULT, 'employee11@admin.com', '12345', '12003', 'Hicham Benali', '143 Jonathon St', 263349846),
                         (DEFAULT, 'employee12@admin.com', '12345', '12004', 'Svetlana Kuznetsova', '143 Jonathon St', 363349846),
                         (DEFAULT, 'employee13@admin.com', '12345', '12005', 'Carlos Martinez', '143 Jonathon St', 463349846),
                         (DEFAULT, 'employee14@admin.com', '12345', '12006', 'Wei Zhang', '143 Jonathon St', 763349846),
                         (DEFAULT, 'employee15@admin.com', '12345', '12007', 'Xin Chen', '143 Jonathon St', 863349846),
                         (DEFAULT, 'employee16@admin.com', '12345', '12008', 'Yuliya Kozlova', '143 Jonathon St', 943349846),
                         (DEFAULT, 'employee17@admin.com', '12345', '13001', 'Ali Khan', '143 Jonathon St', 573349846),
                         (DEFAULT, 'employee18@admin.com', '12345', '13002', 'Zainab Malik', '143 Jonathon St', 583349846),
                         (DEFAULT, 'employee19@admin.com', '12345', '13003', 'Amine Moussaoui', '143 Jonathon St', 593349846),
                         (DEFAULT, 'employee20@admin.com', '12345', '13004', 'Luis Hernandez', '143 Jonathon St', 513349846),
                         (DEFAULT, 'employee21@admin.com', '12345', '13005', 'Nova Stardust', '143 Jonathon St', 523349846),
                         (DEFAULT, 'employee22@admin.com', '12345', '13006', 'Xander Phoenix', '143 Jonathon St', 561349846),
                         (DEFAULT, 'employee23@admin.com', '12345', '13007', 'Luna Eclipse', '143 Jonathon St', 562349846),
                         (DEFAULT, 'employee24@admin.com', '12345', '13008', 'Jaxon Thunder', '143 Jonathon St', 563349846),
                         (DEFAULT, 'employee25@admin.com', '12345', '14001', 'Aria Sky', '143 Jonathon St', 564349846),
                         (DEFAULT, 'employee26@admin.com', '12345', '14002', 'Orion Blaze', '143 Jonathon St', 565349846),
                         (DEFAULT, 'employee27@admin.com', '12345', '14003', 'Aurora Borealis', '143 Jonathon St', 563498476),
                         (DEFAULT, 'employee28@admin.com', '12345', '14004', 'Phoenix Fire', '143 Jonathon St', 567334984),
                         (DEFAULT, 'employee29@admin.com', '12345', '14005', 'Zephyr Wind', '143 Jonathon St', 568329846),
                         (DEFAULT, 'employee30@admin.com', '12345', '14006', 'Cassius Nightshade', '143 Jonathon St', 569319846),
                         (DEFAULT,  'employee31@admin.com', '12345', '14007', 'Hamid Mcgee', '143 Jonathon St', 563339847),
                         (DEFAULT,  'employee32@admin.com', '12345', '14008', 'Jonathon Bravo', '143 Jonathon St', 563349848),
                         (DEFAULT,  'employee33@admin.com', '12345', '15001', 'Sad Johnny', '143 Jonathon St', 563359849),
                         (DEFAULT,  'employee34@admin.com', '12345', '15002', 'Happy Johnny', '143 Jonathon St', 563369841),
                         (DEFAULT,  'employee35@admin.com', '12345', '15003', 'Maid Luna', '143 Jonathon St', 563379842),
                         (DEFAULT,  'employee36@admin.com', '12345', '15004', 'Experience Blaze', '143 Jonathon St', 563389543),
                         (DEFAULT,  'employee37@admin.com', '12345', '15005', 'Sandstorm Boomie', '143 Jonathon St', 563399444),
                         (DEFAULT,  'employee38@admin.com', '12345', '15006', 'Geegee Enthusiast', '143 Jonathon St', 563349344),
                         (DEFAULT,  'employee39@admin.com', '12345', '15007', 'James Charles', '143 Jonathon St', 563319244),
                         (DEFAULT,  'employee40@admin.com', '12345', '15008', 'Raj Tajmahal', '143 Jonathon St', 563349144);

INSERT INTO employeeposition VALUES
                                 (1,1),
                                 (1,5),
                                 (2,1),
                                 (2,5),
                                 (3,1),
                                 (3,5),
                                 (4,1),
                                 (4,5),
                                 (5,1),
                                 (5,5),
                                 (6,1),
                                 (6,5),
                                 (7,1),
                                 (7,5),
                                 (8,1),
                                 (8,5),
                                 (9,1),
                                 (9,5),
                                 (10,1),
                                 (10,5),
                                 (11,1),
                                 (11,5),
                                 (12,1),
                                 (12,5),
                                 (13,1),
                                 (13,5),
                                 (14,1),
                                 (14,5),
                                 (15,1),
                                 (15,5),
                                 (16,1),
                                 (16,5),
                                 (17,1),
                                 (17,5),
                                 (18,1),
                                 (18,5),
                                 (19,1),
                                 (19,5),
                                 (20,1),
                                 (20,5),
                                 (21,1),
                                 (21,5),
                                 (22,1),
                                 (22,5),
                                 (23,1),
                                 (23,5),
                                 (24,1),
                                 (24,5),
                                 (25,1),
                                 (25,5),
                                 (26,1),
                                 (26,5),
                                 (27,1),
                                 (27,5),
                                 (28,1),
                                 (28,5),
                                 (29,1),
                                 (29,5),
                                 (30,1),
                                 (30,5),
                                 (31,1),
                                 (31,5),
                                 (32,1),
                                 (32,5),
                                 (33,1),
                                 (33,5),
                                 (34,1),
                                 (34,5),
                                 (35,1),
                                 (35,5),
                                 (36,1),
                                 (36,5),
                                 (37,1),
                                 (37,5),
                                 (38,1),
                                 (38,5),
                                 (39,1),
                                 (39,5),
                                 (40,1),
                                 (40,5);

-- DROP VIEW available_rooms, hotels_capacity;
-- DROP TABLE Booking, Archive, Renting, Employee, Customer, Positions, Room, Hotel, HotelChain, Cities, EmployeePosition;
-- DROP FUNCTION increment_num_of_hotels();
-- DROP FUNCTION increment_num_of_rooms();
/*
SQL DDL's USED TO CREATE THE TABLES

4) Implement the database according to your relational database schema and the constraints that you have defined.
*/
CREATE DATABASE Hotels;


CREATE TABLE HotelChain (
    ChainID CHAR(5) NOT NULL,
    Name VARCHAR(40) NOT NULL,
    OfficeAddress VARCHAR(50) NOT NULL,
    NumberOfHotels NUMERIC NOT NULL,
    ContactEmail VARCHAR(40) NOT NULL,
    PhoneNumber CHAR(10) NOT NULL,
    PRIMARY KEY(ChainID)
);

CREATE TABLE Hotel (
    HotelID CHAR(5) NOT NULL,
    ChainID CHAR(5) NOT NULL,
    Category INTEGER constraint max_length check ( Category<=5 ) NOT NULL,
    NumOfRooms NUMERIC NOT NULL,
    Address VARCHAR(50) NOT NULL,
    ContactEmail VARCHAR(40) NOT NULL,
    PhoneNumber CHAR(10) NOT NULL,
    PRIMARY KEY (HotelID),
    FOREIGN KEY (ChainID) REFERENCES HotelChain(ChainID) ON DELETE CASCADE
);

CREATE TABLE Room (
    RoomID CHAR(5) NOT NULL,
    HotelID CHAR(5) NOT NULL,
    RoomNumber NUMERIC(20) NOT NULL,
    Price NUMERIC(20) NOT NULL,
    Amenities VARCHAR(100) NOT NULL,
    Capacity NUMERIC(20) NOT NULL,
    SeaView BOOLEAN NOT NULL,
    MountainView BOOLEAN NOT NULL,
    Extendable BOOLEAN NOT NULL,
    Damages BOOLEAN NOT NULL,
    PRIMARY KEY(RoomID),
    FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE
);

CREATE TABLE Positions (
    PositionID CHAR(5) NOT NULL,
    PositionName VARCHAR(40) NOT NULL,
    PRIMARY KEY (PositionID)
);

CREATE TABLE Customer (
    CustomerID CHAR(5) NOT NULL,
    FullName VARCHAR(40) NOT NULL,
    Address VARCHAR(50) NOT NULL,
    SSN NUMERIC(9) NOT NULL,
    DateOfRegistration DATE NOT NULL,
    PRIMARY KEY(CustomerID)
);

CREATE TABLE Employee (
    EmployeeID CHAR(5) NOT NULL,
    PositionID CHAR(5) NOT NULL,
    HotelID CHAR(5) NOT NULL,
    FullName VARCHAR(40) NOT NULL,
    Address VARCHAR(50) NOT NULL,
    SSN NUMERIC(9) NOT NULL,
    PRIMARY KEY (EmployeeID),
    FOREIGN KEY (PositionID) REFERENCES Positions(PositionID) ON DELETE CASCADE,
    FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE

);

CREATE TABLE Renting (
    RentingID CHAR(5) NOT NULL,
    HotelID CHAR(5) NOT NULL,
    RoomID CHAR(5) NOT NULL,
    CustomerID CHAR(5) NOT NULL,
    CheckinDate DATE NOT NULL,
    checkoutDate DATE NOT NULL,
    PRIMARY KEY(RentingID),
    FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE,
    FOREIGN KEY (RoomID) REFERENCES Room(RoomID) ON DELETE CASCADE,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);


CREATE TABLE Archive (
    ArchiveID CHAR(5) NOT NULL,
    IsBooking BOOLEAN NOT NULL,
    ArchivedID CHAR(5) NOT NULL,
    HotelID CHAR(5) NOT NULL,
    RoomID CHAR(5) NOT NULL,
    CustomerID CHAR(5) NOT NULL,
    BookingDate DATE NOT NULL,
    CheckinDate DATE NOT NULL,
    checkoutDate DATE NOT NULL,
    PRIMARY KEY(ArchiveID),
    FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE,
    FOREIGN KEY (RoomID) REFERENCES Room(RoomID) ON DELETE CASCADE,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);


CREATE TABLE Booking (
    BookingID CHAR(5) NOT NULL,
    HotelID CHAR(5) NOT NULL,
    RoomID CHAR(5) NOT NULL,
    CustomerID CHAR(5) NOT NULL,
    BookingDate DATE NOT NULL,
    CheckinDate DATE NOT NULL,
    CheckoutDate Date NOT NULL,
    PRIMARY KEY (BookingID),
    FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE,
    FOREIGN KEY (RoomID) REFERENCES Room(RoomID) ON DELETE CASCADE,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);


DROP TABLE Booking, Archive, Renting, Employee, Customer, Positions, Room, Hotel, HotelChain;

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
    ('00004','Pleasant Galaxy Motel', '73 Fairy St, Miami, USA 33130', 8, 'galaxy@fly.com', '3045849385'),
    ('00005', 'Refresh Resort', '1 Heavenly St, Charleston, USA 29403', 8, 'contact@refresh.com', '3045849385');

INSERT INTO Hotel VALUES 
    ('11001', '00001', 3, 50, '123 Main St, Springfield, USA 62704', 'contactspring@marriot.com', '5551234567'),
    ('11002', '00001', 4, 100, '456 Oak Ave, Portland, USA 97209', 'contactoak@marriot.com', '5552345678'),
    ('11003', '00001', 2, 25, '789 Elm St, Charleston, USA 29403', 'contactelm@marriot.com', '5553456789'),
    ('11004', '00001', 5, 150, '321 Maple Dr, Austin, USA 78753', 'contactmaple@marriot.com', '5554567890'),
    ('11005', '00001', 3, 50, '987 Pine St, Miami, USA 33130', 'contactpine@marriot.com', '5555678901'),
    ('11006', '00001', 4, 100, '2468 Market St, San Francisco, USA 94114', 'contactmarket@marriot.com', '5556789012'),
    ('11007', '00001', 2, 25, '1357 Broadway, New York, USA 10018', 'contactbroadway@marriot.com', '5557890123'),
    ('11008', '00001', 5, 150, '3699 Wilshire Blvd, Los Angeles, USA 90010', 'contactwilshire@marriot.com', '5558901234'),

    ('12001', '00002', 3, 50, '2345 Cherry Lane, Seattle, USA 98101', 'hellocherry@hilton.com', '5551234568'),
    ('12002', '00002', 4, 100, '6789 Oakwood Dr, Denver, USA 80209', 'hellooakwood@hilton.com', '5552345679'),
    ('12003', '00002', 2, 25, '1111 Peachtree St, Atlanta, USA 30309', 'hellopeachtree@hilton.com', '5553456790'),
    ('12004', '00002', 5, 150, '2222 Walnut St, Philadelphia, USA 19103', 'hellowalnut@hilton.com', '5554567891'),
    ('12005', '00002', 3, 50, '3333 State St, Chicago, USA 60610', 'hellostate@hilton.com', '5555678902'),
    ('12006', '00002', 4, 100, '4444 Market St, San Diego, USA 92102', 'hellomarket@hilton.com', '5556789013'),
    ('12007', '00002', 2, 25, '5555 Sunset Blvd, Hollywood, USA 90028', 'info@hotel7.com', '5557890124'),
    ('12008', '00002', 4, 100, '6666 Lombard St, San Francisco, USA 94111', 'hellolombard@hilton.com', '5556789013'),

    ('13001', '00003', 3, 50, '7777 Central Park, New York, USA 10019', 'fairmontcentral@contact.com', '5551234569'),
    ('13002', '00003', 4, 100, '8888 Rodeo Dr, Beverly Hills, USA 90210', 'fairmontrodeo@contact.com', '5552345680'),
    ('13003', '00003', 2, 25, '9999 Huntington Ave, Boston, USA 02115', 'fairmonthuntington@contact.com', '5553456791'),
    ('13004', '00003', 5, 150, '10000 Lincoln Ave, Miami, USA 33139', 'fairmontlincoln@contact.com', '5554567892'),
    ('13005', '00003', 3, 50, '11000 Melrose Ave, Los Angeles, USA 90048', 'fairmontmelrose@contact.com', '5555678903'),
    ('13006', '00003', 4, 100, '12000 Ventura Blvd, Sherman Oaks, USA 91423', 'fairmontventura@contact.com', '5556789014'),
    ('13007', '00003', 2, 25, '13000 Sunset Blvd, Hollywood, USA 90027', 'fairmontsunset@contact.com', '5557890125'),
    ('13008', '00003', 5, 150, '14000 Wilshire Blvd, Beverly Hills, USA 90212', 'fairmontwilhshire@contact.com', '5558901236'),

    ('14001', '00004', 3, 50, '15000 Santa Monica Blvd, Los Angeles, USA 90035', 'galaxysantamonica@fly.com', '5551234570'),
    ('14002', '00004', 4, 100, '16000 Pico Blvd, Santa Monica, USA 90405', 'galaxypico@fly.com', '5552345681'),
    ('14003', '00004', 2, 25, '17000 Colorado Blvd, Pasadena, USA 91106', 'galaxycolorado@fly.com', '5553456792'),
    ('14004', '00004', 5, 150, '18000 Mulholland Dr, Los Angeles, USA 90272', 'galaxymulholland@fly.com', '5554567893'),
    ('14005', '00004', 3, 50, '19000 Magnolia Blvd, Burbank, USA 91505', 'galaxymagnolia@fly.com', '5555678904'),
    ('14006', '00004', 4, 100, '20000 Pacific Coast Hwy, Malibu, USA 90265', 'galaxypacificcoast@fly.com', '5556789015'),
    ('14007', '00004', 2, 25, '21000 Topanga Canyon Blvd, Chatsworth, USA 91311', 'galaxytopangacanyon@fly.com', '5557890126'),
    ('14008', '00004', 5, 150, '22000 S Figueroa St, Los Angeles, USA 90007', 'galaxyfigueroa@fly.com', '5558907382'),
    
    ('15001', '00005', 3, 50, '7666 Central Park, New York, USA 10019', 'contactcarson@refresh.com', '5551234571'),
    ('15002', '00005', 4, 100, '24000 Imperial Hwy, Downey, USA 90242', 'contactimperial@refresh.com', '5552345682'),
    ('15003', '00005', 2, 25, '25000 San Fernando Rd, Santa Clarita, USA 91321', 'contactsanfernando@refresh.com', '5553456793'),
    ('15004', '00005', 5, 150, '26000 N Western Ave, San Pedro, USA 90731', 'contactwestern@refresh.com', '5554567894'),
    ('15005', '00005', 3, 50, '27000 E Washington Blvd, Pasadena, USA 91107', 'contactwashington@refresh.com', '5555678905'),
    ('15006', '00005', 4, 100, '28000 Olympic Blvd, Santa Monica, USA 90404', 'contactolympic@refresh.com', '5556789016'),
    ('15007', '00005', 2, 25, '29000 Van Nuys Blvd, Sherman Oaks, USA 91403', 'contactvannuys@refresh.com', '5557890127'),
    ('15008', '00005', 5, 150, '30000 Beverly Blvd, Los Angeles, USA 90048', 'contactbeverly@refresh.com', '5558901234');

INSERT INTO Room VALUES 
-- HotelChain 00001
-- Hotel 11001
    ('20001', '11001', 101, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
    ('20002', '11001', 102, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20003', '11001', 103, 100, 'TV, WiFi', 1, false, true, false, false),
    ('20004', '11001', 104, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20005', '11001', 105, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 11002
    ('20006', '11002', 101, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, true),
    ('20007', '11002', 102, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20008', '11002', 103, 120, 'TV, WiFi', 1, false, true, false, true),
    ('20009', '11002', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20010', '11002', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, true),
-- Hotel 11003
    ('20011', '11003', 101, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20012', '11003', 102, 150, 'TV, WiFi', 1, false, true, false, false),
    ('20013', '11003', 103, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20014', '11003', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, true),
    ('20015', '11003', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 11004
    ('20016', '11002', 114, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20017', '11002', 115, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20018', '11002', 116, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20019', '11002', 117, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20020', '11002', 118, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel 11005
    ('20021', '11003', 119, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
    ('20022', '11003', 120, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20023', '11003', 121, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20024', '11003', 122, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20025', '11003', 123, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 11006
    ('20026', '11004', 124, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20027', '11004', 125, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20028', '11004', 126, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20029', '11004', 127, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20030', '11004', 128, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 11007
    ('20031', '11006', 101, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20032', '11006', 102, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20033', '11006', 103, 90, 'Air conditioning, TV', 1, false, true, false, false),
    ('20034', '11006', 104, 200, 'Air conditioning, TV', 2, true, false, true, false),
    ('20035', '11006', 105, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 11008
    ('20036', '11007', 101, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20037', '11007', 102, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20038', '11007', 103, 110, 'Air conditioning, TV', 1, false, true, false, false),
    ('20039', '11007', 104, 250, 'Air conditioning, TV', 2, true, false, true, false),
    ('20040', '11007', 105, 90, 'Air conditioning, TV', 1, false, false, false, false),
    
-- HotelChain 00002
-- Hotel 12001
    ('20101', '12001', 101, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
    ('20102', '12001', 102, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20103', '12001', 103, 100, 'TV, WiFi', 1, false, true, false, false),
    ('20104', '12001', 104, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20105', '12001', 105, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 12002
    ('20106', '12002', 101, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20107', '12002', 102, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20108', '12002', 103, 120, 'TV, WiFi', 1, false, true, false, false),
    ('20109', '12002', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20110', '12002', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 12003
    ('20111', '12003', 101, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20112', '12003', 102, 150, 'TV, WiFi', 1, false, true, false, false),
    ('20113', '12003', 103, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20114', '12003', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20115', '12003', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 12004
    ('20116', '12002', 114, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20117', '12002', 115, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20118', '12002', 116, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20119', '12002', 117, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20120', '12002', 118, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel 12005
    ('20121', '12003', 119, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
    ('20122', '12003', 120, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20123', '12003', 121, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20124', '12003', 122, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20125', '12003', 123, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 12006
    ('20126', '12004', 124, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20127', '12004', 125, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20128', '12004', 126, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20129', '12004', 127, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20130', '12004', 128, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 12007
    ('20131', '12006', 101, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20132', '12006', 102, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20133', '12006', 103, 90, 'Air conditioning, TV', 1, false, true, false, false),
    ('20134', '12006', 104, 200, 'Air conditioning, TV', 2, true, false, true, false),
    ('20135', '12006', 105, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 12008
    ('20136', '12007', 101, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20137', '12007', 102, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20138', '12007', 103, 120, 'Air conditioning, TV', 1, false, true, false, false),
    ('20139', '12007', 104, 250, 'Air conditioning, TV', 2, true, false, true, false),
    ('20140', '12007', 105, 90, 'Air conditioning, TV', 1, false, false, false, false),

-- HotelChain 00003
-- Hotel 13001
    ('20201', '13001', 101, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
    ('20202', '13001', 102, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20203', '13001', 103, 100, 'TV, WiFi', 1, false, true, false, false),
    ('20204', '13001', 104, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20205', '13001', 105, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 13002
    ('20206', '13002', 101, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20207', '13002', 102, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20208', '13002', 103, 120, 'TV, WiFi', 1, false, true, false, false),
    ('20209', '13002', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20210', '13002', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 13003
    ('20211', '13003', 101, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20212', '13003', 102, 150, 'TV, WiFi', 1, false, true, false, false),
    ('20213', '13003', 103, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20214', '13003', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20215', '13003', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 13004
    ('20216', '13002', 114, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20217', '13002', 115, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20218', '13002', 116, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20219', '13002', 117, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20220', '13002', 118, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel 13005
    ('20221', '13003', 119, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
    ('20222', '13003', 120, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20223', '13003', 121, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20224', '13003', 122, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20225', '13003', 123, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 13006
    ('20226', '13004', 124, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20227', '13004', 125, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20228', '13004', 126, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20229', '13004', 127, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20230', '13004', 128, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 13007
    ('20231', '13006', 101, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20232', '13006', 102, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20233', '13006', 103, 90, 'Air conditioning, TV', 1, false, true, false, false),
    ('20234', '13006', 104, 200, 'Air conditioning, TV', 2, true, false, true, false),
    ('20235', '13006', 105, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 13008
    ('20236', '13007', 101, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20237', '13007', 102, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20238', '13007', 103, 130, 'Air conditioning, TV', 1, false, true, false, false),
    ('20239', '13007', 104, 250, 'Air conditioning, TV', 2, true, false, true, false),
    ('20240', '13007', 105, 90, 'Air conditioning, TV', 1, false, false, false, false),

-- HotelChain 00004
-- Hotel 14001
    ('20301', '14001', 101, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
    ('20302', '14001', 102, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20303', '14001', 103, 100, 'TV, WiFi', 1, false, true, false, false),
    ('20304', '14001', 104, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20305', '14001', 105, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 14002
    ('20306', '14002', 101, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20307', '14002', 102, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20308', '14002', 103, 120, 'TV, WiFi', 1, false, true, false, false),
    ('20309', '14002', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20310', '14002', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 14003
    ('20311', '14003', 101, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20312', '14003', 102, 150, 'TV, WiFi', 1, false, true, false, false),
    ('20313', '14003', 103, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20314', '14003', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20315', '14003', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 14004
    ('20316', '14002', 114, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20317', '14002', 115, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20318', '14002', 116, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20319', '14002', 117, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20320', '14002', 118, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel 14005
    ('20321', '14003', 119, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
    ('20322', '14003', 120, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20323', '14003', 121, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20324', '14003', 122, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20325', '14003', 123, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 14006
    ('20326', '14004', 124, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20327', '14004', 125, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20328', '14004', 126, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20329', '14004', 127, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20330', '14004', 128, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 14007
    ('20331', '14006', 101, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20332', '14006', 102, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20333', '14006', 103, 90, 'Air conditioning, TV', 1, false, true, false, false),
    ('20334', '14006', 104, 200, 'Air conditioning, TV', 2, true, false, true, false),
    ('20335', '14006', 105, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 14008
    ('20336', '14007', 101, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20337', '14007', 102, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20338', '14007', 103, 140, 'Air conditioning, TV', 1, false, true, false, false),
    ('20339', '14007', 104, 250, 'Air conditioning, TV', 2, true, false, true, false),
    ('20340', '14007', 105, 90, 'Air conditioning, TV', 1, false, false, false, false),

-- HotelChain 00005
-- Hotel 15001
    ('20401', '15001', 101, 150, 'TV, WiFi, minibar', 2, true, false, true, false),
    ('20402', '15001', 102, 200, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20403', '15001', 103, 100, 'TV, WiFi', 1, false, true, false, false),
    ('20404', '15001', 104, 250, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20405', '15001', 105, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
-- Hotel 15002
    ('20406', '15002', 101, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20407', '15002', 102, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20408', '15002', 103, 120, 'TV, WiFi', 1, false, true, false, false),
    ('20409', '15002', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20410', '15002', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 15003
    ('20411', '15003', 101, 180, 'TV, WiFi, minibar', 2, false, true, false, false),
    ('20412', '15003', 102, 150, 'TV, WiFi', 1, false, true, false, false),
    ('20413', '15003', 103, 220, 'TV, WiFi, minibar, balcony', 2, true, false, true, false),
    ('20414', '15003', 104, 300, 'TV, WiFi, minibar, balcony', 3, true, true, true, false),
    ('20415', '15003', 105, 250, 'TV, WiFi, minibar, balcony', 2, false, true, true, false),
-- Hotel 15004
    ('20416', '15002', 114, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20417', '15002', 115, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20418', '15002', 116, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
    ('20419', '15002', 117, 75, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, true),
    ('20420', '15002', 118, 80, 'Wifi, TV, Air conditioning, Mini bar', 2, true, false, true, false),
-- Hotel15005
    ('20421', '15003', 119, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, true),
    ('20422', '15003', 120, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20423', '15003', 121, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20424', '15003', 122, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
    ('20425', '15003', 123, 100, 'Wifi, TV, Air conditioning, Balcony', 2, true, true, true, false),
-- Hotel 15006
    ('20426', '15004', 124, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20427', '15004', 125, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20428', '15004', 126, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
    ('20429', '15004', 127, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, true),
    ('20430', '15004', 128, 60, 'Wifi, TV, Air conditioning', 2, false, true, true, false),
-- Hotel 15007
    ('20431', '15006', 101, 120, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20432', '15006', 102, 140, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20433', '15006', 103, 90, 'Air conditioning, TV', 1, false, true, false, false),
    ('20434', '15006', 104, 200, 'Air conditioning, TV', 2, true, false, true, false),
    ('20435', '15006', 105, 70, 'Air conditioning, TV', 1, false, false, false, false),
-- Hotel 15008
    ('20436', '15007', 101, 130, 'Air conditioning, TV, minibar', 2, true, false, false, false),
    ('20437', '15007', 102, 160, 'Air conditioning, TV, minibar, balcony', 2, true, false, true, false),
    ('20438', '15007', 103, 150, 'Air conditioning, TV', 1, false, true, false, false),
    ('20439', '15007', 104, 250, 'Air conditioning, TV', 2, true, false, true, false),
    ('20440', '15007', 105, 90, 'Air conditioning, TV', 1, false, false, false, false);

/*
/*
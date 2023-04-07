import { Dayjs } from "dayjs";

export interface Room {
    roomid: string;
    hotelid: string;
    roomNumber: number;
    hotelName?: string;
    category: number;
    address: string;
    fullAddress?: string;
    price: number;
    amenities: string;
    capacity: number;
    seaview: boolean;
    mountainview: boolean;
    extendable: boolean;
    damages: boolean;
  }
export interface Customer {
  customerid: string;
  address : string;
  dateofregistration: Dayjs;
  email: string;
  fullname: string,
  password: string;
  ssn: string;
  bookings?: Booking
}
export interface Employee {
  employeeid: string;
  email : string;
  password: string;
  positionid: string;
  hotelid: string,
  fullname: string;
  address: string;
  ssn: string
}
export interface Booking {
  bookingid: string,
  hotelid: string,
  roomid: string,
  customerid: string,
  bookingdate: Dayjs,
  checkindate: Dayjs,
  checkoutdate: Dayjs
}
export interface Renting {
  rentingid: string,
  hotelid: string,
  roomid: string,
  customerid: string,
  checkindate: Dayjs,
  checkoutdate: Dayjs
}
export interface Hotel{
  hotelid: string,
  chainid: string,
  category: string,
  numofrooms: string,
  address: string,
  contactemail: string,
  phonenumber: string
}
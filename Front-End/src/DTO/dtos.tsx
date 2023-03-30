import dayjs, { Dayjs } from "dayjs";

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
export interface Booking {
  bookingid: string,
  hotelid: string,
  roomid: string,
  customerid: string,
  bookingdate: Dayjs,
  checkindate: Dayjs,
  checkoutdate: Dayjs
}
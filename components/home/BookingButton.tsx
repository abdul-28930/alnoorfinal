import React, { useState } from "react";
import BookingModal, { BookingData } from "../modals/BookingModal";

interface BookingButtonProps {
  roomType?: string;
  roomPrice?: number;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  children?: React.ReactNode;
}

const BookingButton: React.FC<BookingButtonProps> = ({
  roomType = "Standard Room",
  roomPrice = 50,
  className = "",
  variant = "primary",
  children = "Book Now",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingSubmit = async (bookingData: BookingData) => {
    try {
      // Calculate number of days
      const checkIn = new Date(bookingData.checkInDate);
      const checkOut = new Date(bookingData.checkOutDate);
      const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

      // Call API to send booking email
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_type: bookingData.roomType,
          name: `${bookingData.firstName} ${bookingData.lastName}`,
          phone: bookingData.phone,
          email: bookingData.email,
          branch: "Online Booking",
          checkin: bookingData.checkInDate,
          checkout: bookingData.checkOutDate,
          days: days,
          query: bookingData.specialRequests || "None",
          isCorporateBooking: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send booking email");
      }

      // Show success message
      alert(`Thank you for booking with Al Noor Hotel! 
        Your booking for ${bookingData.roomType} has been received.
        A confirmation email will be sent to ${bookingData.email}.`);
    } catch (error) {
      console.error("Booking API error:", error);
      alert("Failed to send booking request. Please try again.");
    }
  };

  // Define button styles based on variant
  let buttonStyles = "";

  switch (variant) {
    case "primary":
      buttonStyles = "bg-amber-600 hover:bg-amber-700 text-white";
      break;
    case "secondary":
      buttonStyles = "bg-blue-600 hover:bg-blue-700 text-white";
      break;
    case "outline":
      buttonStyles =
        "bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-50";
      break;
    default:
      buttonStyles = "bg-amber-600 hover:bg-amber-700 text-white";
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`px-4 py-2 rounded-md transition duration-300 font-medium ${buttonStyles} ${className}`}
      >
        {children}
      </button>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBookingSubmit}
        roomType={roomType}
        roomPrice={roomPrice}
      />
    </>
  );
};

export default BookingButton;

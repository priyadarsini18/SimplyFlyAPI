using AutoMapper;
using SimplyFlyAPI.DTOs.Auth;
using SimplyFlyAPI.DTOs.Booking;
using SimplyFlyAPI.DTOs.Flight;
using SimplyFlyAPI.DTOs.Passenger;
using SimplyFlyAPI.DTOs.Payment;
using SimplyFlyAPI.DTOs.Refund;
using SimplyFlyAPI.DTOs.Route;
using SimplyFlyAPI.DTOs.Ticket;
using SimplyFlyAPI.Models;

namespace SimplyFlyAPI.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Flight Mapping

            CreateMap<CreateFlightDto, Flight>()
                .ForMember(dest => dest.FlightId,
                    opt => opt.Ignore());

            // User Registration Mapping

            CreateMap<RegisterUserDto, User>()
                .ForMember(dest => dest.UserId,
                    opt => opt.Ignore())
                .ForMember(dest => dest.Role,
                    opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt,
                    opt => opt.Ignore());

            CreateMap<RegisterAdminDto, User>()
                .ForMember(dest => dest.UserId,
                    opt => opt.Ignore())
                .ForMember(dest => dest.Role,
                    opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt,
                    opt => opt.Ignore());


            CreateMap<RegisterFlightOwnerDto, User>()
                .ForMember(dest => dest.UserId,
                    opt => opt.Ignore())
                .ForMember(dest => dest.Role,
                    opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt,
                    opt => opt.Ignore());

            CreateMap<CreateBookingDto, Booking>()
                .ForMember(dest => dest.BookingId,
                opt => opt.Ignore())
                .ForMember(dest => dest.BookingDate,
        opt => opt.Ignore())
    .ForMember(dest => dest.TotalAmount,
        opt => opt.Ignore())
    .ForMember(dest => dest.BookingStatus,
        opt => opt.Ignore())
    .ForMember(dest => dest.PaymentStatus,
        opt => opt.Ignore())
    .ForMember(dest => dest.User,
        opt => opt.Ignore())
    .ForMember(dest => dest.Flight,
        opt => opt.Ignore());

            CreateMap<Booking, BookingResponseDto>();

            CreateMap<PassengerDto, Passenger>()
    .ForMember(dest => dest.PassengerId,
        opt => opt.Ignore())
    .ForMember(dest => dest.Booking,
        opt => opt.Ignore());


            CreateMap<PaymentDto, Payment>()
    .ForMember(dest => dest.PaymentId,
        opt => opt.Ignore())
    .ForMember(dest => dest.PaymentDate,
        opt => opt.Ignore())
    .ForMember(dest => dest.PaymentStatus,
        opt => opt.Ignore())
    .ForMember(dest => dest.Booking,
        opt => opt.Ignore());

            CreateMap<CreateRefundDto, Refund>()
    .ForMember(dest => dest.RefundId,
        opt => opt.Ignore())
    .ForMember(dest => dest.RefundDate,
        opt => opt.Ignore())
    .ForMember(dest => dest.RefundStatus,
        opt => opt.Ignore())
    .ForMember(dest => dest.Booking,
        opt => opt.Ignore());

            CreateMap<RouteDto, FlightRoute>()
                .ForMember(dest => dest.RouteId,
                    opt => opt.Ignore());

            CreateMap<TicketDto, Ticket>()
    .ForMember(dest => dest.TicketId,
        opt => opt.Ignore())
    .ForMember(dest => dest.IssueDate,
        opt => opt.Ignore())
    .ForMember(dest => dest.TicketStatus,
        opt => opt.Ignore());
        }
    }
}
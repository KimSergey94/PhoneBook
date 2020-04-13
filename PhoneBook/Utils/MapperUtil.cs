using AutoMapper;
using PhoneBook.Models;
using PhoneBook.Models.EF;
using System.Collections.Generic;
using System.Linq;

namespace PhoneBook.Utils
{
    static class MapperUtil
    {
        public static ContactVM MapToContactVM(Contact contact)
        {
            return new MapperConfiguration(cfg => cfg.CreateMap<Contact, ContactVM>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Patronymic, opt => opt.MapFrom(src => src.Patronymic))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.PhoneNumber.Count > 0 
                        ? src.PhoneNumber.Aggregate((i, j) => new PhoneNumber { Number = (i.Number + ";;;" + j.Number) }).Number
                        : "-"))
                .ForMember(dest => dest.Note, opt => opt.MapFrom(src => src.Note.Count > 0 
                        ? src.Note.Aggregate((i, j) => new Note { NoteText = (i.NoteText + ";;;" + j.NoteText) }).NoteText
                        : "-"))
                ).CreateMapper().Map<Contact, ContactVM>(contact);
        }

        public static Contact MapToContact(ContactVM contact)
        {
            Contact result = new MapperConfiguration(cfg => cfg.CreateMap<ContactVM, Contact>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Patronymic, opt => opt.MapFrom(src => src.Patronymic))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.Ignore())
                .ForMember(dest => dest.Note, opt => opt.Ignore())
                //.ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.Number)                        
                //        ? src.Number.Aggregate((i, j) => new List<PhoneNumber> { new PhoneNumber { Number = (i.Number + "; " + j.Number) } }).Number
                //        : "-"))

                //.ForMember(dest => dest.Note, opt => opt.MapFrom(src => src.Note.Count > 0
                //        ? src.Note.Aggregate((i, j) => new Note { NoteText = (i.NoteText + "; " + j.NoteText) }).NoteText
                //        : "-"))
                ).CreateMapper().Map<ContactVM, Contact>(contact);
            result.PhoneNumber = new List<PhoneNumber>() { new PhoneNumber { Number = contact.Number } };
            result.Note = new List<Note>() { new Note { NoteText = contact.Note } };
            return result;
        }

        //public static List<AppointmentRecordVM> MapToAppointmentRecordVMList(IEnumerable<AppointmentRecordDTO> appointmentRecordDTOs)
        //{
        //    return new MapperConfiguration(cfg => cfg.CreateMap<AppointmentRecordDTO, AppointmentRecordVM>()).CreateMapper()
        //        .Map<IEnumerable<AppointmentRecordDTO>, List<AppointmentRecordVM>>(appointmentRecordDTOs);
        //}




    }
}
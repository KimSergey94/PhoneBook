using AutoMapper;
using PhoneBook.Models;
using PhoneBook.Models.EF;
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
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.PhoneNumber.Count > 0 ?
                                    src.PhoneNumber.Aggregate((i, j) => new PhoneNumber { Number = (i.Number + "; " + j.Number) }).Number
                                    : "null"))
                .ForMember(dest => dest.Note, opt => opt.MapFrom(src => src.Note.Count > 0 ? 
                                    src.Note.Aggregate((i, j) => new Note { NoteText = (i.NoteText + "; " + j.NoteText) }).NoteText
                                    : "null"))
                ).CreateMapper().Map<Contact, ContactVM>(contact);
        }
        
        //public static List<AppointmentRecordVM> MapToAppointmentRecordVMList(IEnumerable<AppointmentRecordDTO> appointmentRecordDTOs)
        //{
        //    return new MapperConfiguration(cfg => cfg.CreateMap<AppointmentRecordDTO, AppointmentRecordVM>()).CreateMapper()
        //        .Map<IEnumerable<AppointmentRecordDTO>, List<AppointmentRecordVM>>(appointmentRecordDTOs);
        //}




    }
}
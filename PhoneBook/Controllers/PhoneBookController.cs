using Newtonsoft.Json;
using PhoneBook.Models;
using PhoneBook.Models.EF;
using PhoneBook.Utils;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace PhoneBook.Controllers
{
    public class PhoneBookController : Controller
    {
        private PhoneBookDbContext db = null;
        private int lastContactId;

        public PhoneBookController()
        {
            db = new PhoneBookDbContext();
        }

        public JsonResult Index()
        {
            List<ContactVM> contactVMs = new List<ContactVM>();
            var contacts = db.Contacts;

            foreach (var contact in contacts)
            {
                db.Entry(contact).Collection(x => x.PhoneNumber).Load();
                db.Entry(contact).Collection(x => x.Note).Load();
            }

            foreach(var item in contacts)
            {
                contactVMs.Add(MapperUtil.MapToContactVM(item));
            }

            return Json(contactVMs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Details(int id)
        {
            var contact = db.Contacts.Find(id);
            return Json(contact, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetPhoneNumbers(int id)
        {
            var contact = db.Contacts.Find(id);
            db.Entry(contact).Collection(x => x.PhoneNumber).Load();
            List<string> numbers = new List<string>();
            foreach (var item in contact.PhoneNumber)
            {
                numbers.Add(item.Number);
            }
            return Json(numbers, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetNotes(int id)
        {
            var contact = db.Contacts.Find(id);
            db.Entry(contact).Collection(x => x.Note).Load();
            List<string> notes = new List<string>();
            foreach (var item in contact.Note)
            {
                notes.Add(item.NoteText);
            }
            return Json(notes, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(ContactVM contactVM)
        {
            Contact contact = MapperUtil.MapToContact(contactVM);
            db.Contacts.Add(contact);
            db.SaveChanges();
            lastContactId = db.Contacts.Max(item => item.Id);
            return Json(lastContactId, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddNumber(int contactId, string number)
        {
            PhoneNumber phoneNumber = new PhoneNumber();
            phoneNumber.ContactId = contactId;
            phoneNumber.Number = number;
            db.PhoneNumbers.Add(phoneNumber);
            db.SaveChanges();
            return Json(null);
        }
        [HttpPost]
        public JsonResult AddNote(int contactId, string noteText)
        {
            Note note = new Note();
            note.ContactId = contactId; 
            note.NoteText = noteText;
            db.Notes.Add(note);
            db.SaveChanges();
            return Json(null);
        }

        [HttpPost]
        public JsonResult Edit(Contact contact)
        {
            db.Entry(contact).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }
        [HttpPost]
        public JsonResult EditNumber(int contactId, string number, int numberElId)
        {
            var contact= db.Contacts.Find(contactId);
            db.Entry(contact).Collection(x => x.PhoneNumber).Load();
            PhoneNumber phoneNumber = contact.PhoneNumber.OrderBy(x => x.Id)
                                                        .Skip(numberElId-1).FirstOrDefault();
            phoneNumber.Number = number;
            db.Entry(contact).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }
        [HttpPost]
        public JsonResult EditNote(int contactId, string noteText, int numberElId)
        {
            var contact = db.Contacts.Find(contactId);
            db.Entry(contact).Collection(x => x.Note).Load();
            Note note = contact.Note.OrderBy(x => x.Id).Skip(numberElId - 1).FirstOrDefault();
            note.NoteText = noteText;
            db.Entry(note).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var contact = db.Contacts.Find(id);
            db.Entry(contact).Collection(x => x.PhoneNumber).Load();
            db.Entry(contact).Collection(x => x.Note).Load();
            db.Contacts.Remove(contact);
            db.SaveChanges();
            return Json(null);
        }
        [HttpPost]
        public JsonResult DeleteNumber(int contactId, int numberElId)
        {
            var contact = db.Contacts.Find(contactId);
            db.Entry(contact).Collection(x => x.PhoneNumber).Load();
            PhoneNumber phoneNumber = contact.PhoneNumber.OrderBy(x => x.Id)
                                                        .Skip(numberElId - 1).FirstOrDefault();
            if(phoneNumber != null)
            {
                db.PhoneNumbers.Remove(phoneNumber);
            }
            db.SaveChanges();
            return Json(null);
        }
        [HttpPost]
        public JsonResult DeleteNote(int contactId, int noteElId)
        {
            Contact contact = db.Contacts.Find(contactId);
            db.Entry(contact).Collection(x => x.Note).Load();
            Note note = contact.Note.OrderBy(x => x.Id).Skip(noteElId - 1).FirstOrDefault();
            if (note != null)
            {
                db.Notes.Remove(note);
            }
            db.SaveChanges();
            return Json(null);
        }
    }
}
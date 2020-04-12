using PhoneBook.Models;
using PhoneBook.Models.EF;
using PhoneBook.Utils;
using System.Collections.Generic;
using System.Web.Mvc;

namespace PhoneBook.Controllers
{
    public class PhoneBookController : Controller
    {
        private PhoneBookDbContext db = null;

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
        public JsonResult Create(Contact contact)
        {
            db.Contacts.Add(contact);
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
        public JsonResult Delete(int id)
        {
            var user = db.Contacts.Find(id);
            db.Contacts.Remove(user);
            db.SaveChanges();
            return Json(null);
        }
    }
}
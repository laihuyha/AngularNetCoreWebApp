using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models.Identity;

namespace API.DTOs
{
    public class AddressDto
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }

        public AddressDto Map(Address address)
        {
            return new AddressDto
            {
                FirstName = address.FirstName,
                LastName = address.LastName,
                Street = address.Street,
                City = address.City,
                State = address.State,
                ZipCode = address.ZipCode
            };
        }
    }
}
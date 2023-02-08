using System.Threading.Tasks;
using API.DTOs;
using API.Errors;
using API.Extensions;
using Core.Interfaces;
using Core.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenServices _tokenServices;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenServices tokenServices)
        {
            _tokenServices = tokenServices;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(User);
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                UserToken = _tokenServices.CreateToken(user)
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("userAddress")]
        public async Task<IActionResult> GetUserAddress()
        {
            var user = await _userManager.FindByEmailWithAddressAsync(User);
            var address = new AddressDto().Map(user.Address);
            return Ok(address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<IActionResult> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindByEmailWithAddressAsync(User);
            if (user != null)
            {
                user.Address = new Address
                {
                    FirstName = address.FirstName,
                    LastName = address.LastName,
                    Street = address.Street,
                    City = address.City,
                    State = address.State,
                    ZipCode = address.ZipCode
                };
            }
            var res = await _userManager.UpdateAsync(user);
            if (res.Succeeded) return Ok(address);
            return BadRequest("Problem updating the user");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized(new APIMessageResponse(401));
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (result.Succeeded)
            {
                return Ok(new UserDto
                {
                    Email = user.Email,
                    DisplayName = user.DisplayName,
                    UserToken = _tokenServices.CreateToken(user)
                });
            }
            return Unauthorized(new APIMessageResponse(401));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            registerDto.UserName = registerDto.DisplayName.ToLower();
            var emailExists = CheckEmailExistsAsync(registerDto.Email).Result.Value;
            if (emailExists)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email address is in use" } });
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                return Ok(new UserDto
                {
                    Email = user.Email,
                    DisplayName = user.DisplayName,
                    UserToken = _tokenServices.CreateToken(user)
                });
            }
            return BadRequest(new APIMessageResponse(400));
        }
    }
}
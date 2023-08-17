const server = require("../index");
const chaiHTTP = require("chai-http");
const chai = require("chai");

chai.should();
chai.use(chaiHTTP);

// Test cases for Signup API
// describe("user signup API", () => {
//   it("it should return Signup successfully", (done) => {
//     let random = Math.floor(Math.random() * 1000);
//     const data = {
//       userName: "Prachi",
//       userEmail: `prachi${random}@gmail.com`,
//       userPassword: "prachi@123",
//       userPHONE: "7069976537",
//       userCity: "indore",
//       userState: "MP",
//       userAddress: "Silicon city",
//       userCountry: "India",
//     };
//     chai
//       .request(server)
//       .post("/user/signup")
//       .send(data)
//       .end((err, res) => {
//         console.log(res);
//         res.should.have.status(200);
//         res.should.be.a("object");
//         res.body.should.have.property("success").eq(true);
//         res.body.should.have
//           .property("message")
//           .eq("Registration successfully");
//       });
//     done();
//   });
// });

//Test cases for Login API
describe("user login API", () => {
  it("it should Return user detail : ", (done) => {
    const data = {
      userEmail: "prachisoni123@gmail.com",
      userPassword: "prachi@123",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq("Login Successfully");
        res.body.should.have.property("token");
    
      });done();
  });
  it("it should return an error for password incorrect", (done) => {
    const data = {
      userEmail: "prachisoni123@gmail.com",
      userPassword: "prachgi@123",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("message").eq("Invalid email or password");
        
      });done();
  });
  it("it should return an error for email id not found", (done) => {
    const data = {
      userEmail: "orachisoni123@gmail.com",
      userPassword: "prachgi@123",
    };
    chai
      .request(server)
      .post("/user/login")
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("message").eq("UserEmail not found");
        
      });done();
  });
});

// Test cases for forget API
describe("forget API", () => {
  it("it should return mail send successfully detail : ", (done) => {
    const data = {
      userEmail: "harshaA2@gmail.com"
    };
    chai
      .request(server)
      .post("/user/forget")
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have.property("message").eq("Mail sent successfully");
        res.body.should.have.property("token");
        res.body.should.have.property("userId");
       
      });done(); 
    
  });
  it("should return an error for email id not found ", (done) => {
    const data = {
      userEmail: "eqlpHi1r283@gmail.com",
    };
    chai
      .request(server)
      .post("/user/forget")
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have.property("message").eq("Email not found");
      });
    done();
  });
});

//RESET
describe("resetPassword API :", () => {
  it("it should return password updated successfully: ", (done) => {
    const data = {
      newPassword: "798683746A",
      confirmPassword:"798683746A",
    };
    chai
      .request(server)
      .post("/user/reset/64661c1e04cd911e875da1bf/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc5ZTUyZDY4NTIwNGQ1YTc0YTcyOWUiLCJpYXQiOjE2ODU3MTE0NDIsImV4cCI6MTY4NTc0Mzg0Mn0.YLlPfVzPh8EAKQR0gQ8FzCHak4eQNmAprU21fNVROA8"
      )
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(true);
        res.body.should.have
          .property("message")
          .eq("Password updated successfully");
        done();
      });
    
  });
  it("it should return newPassword and confirmPassword not matched :", (done) => {
    const data = {
      newPassword: "798683746A",
      confirmPassword:"79868374",
    };
    chai
      .request(server)
      .post("/user/reset/64661c1e04cd911e875da1bf/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc5ZTUyZDY4NTIwNGQ1YTc0YTcyOWUiLCJpYXQiOjE2ODU3MTE0NDIsImV4cCI6MTY4NTc0Mzg0Mn0.YLlPfVzPh8EAKQR0gQ8FzCHak4eQNmAprU21fNVROA8"
      )
      .send(data)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        res.body.should.have
          .property("message")
          .eq("newPassword and confirmPassword is not matched");
      });
    done();
  });
});

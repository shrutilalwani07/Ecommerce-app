const isUser = async (req, res, next) => { 
    console.log(req.body.userRole); 
    if (req.body.userRole === "user") { 
      console.log("inside if:", req.body.userRole); 
      next(); 
    } else{res.status(401).json({ 
      status: false, 
      message: "You are not Authorized person", 
    });}  
  }; 
   
  const isAdmin = async (req, res, next) => { 
    if (req.body.userRole === "admin") { 
      next(); 
    }else{ 
      res.status(401).json({ 
          status: false, 
          message: "You are not Authorized person", 
        }); 
    } 
  }; 
   
  const isVendor = async (req, res, next) => { 
    if (req.body.userRole === "vendor" || "admin") { 
      next(); 
    } else { 
      res.status(401).json({ 
        status: false, 
        message: "You are not Authorized person", 
      }); 
    } 
  }; 
   
module.exports = { isUser, isAdmin, isVendor };
  
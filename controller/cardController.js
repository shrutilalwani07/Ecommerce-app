// const { features } = require("process");
// const cardSchema = require("../models/cardSchema")
// const fs = require("fs");

// //API for add card
// const addcard = async (req, res) => {
//     try {
//       const newcard = new cardSchema (req.body);
//       if (newcard != null) {
//         await newcard.save()
//         res.status(200).json({
//           success: true,
//           message: "card added successfully",
//         });
//       } else {
//         res.status(404).json({
//           success: false,
//           message: "card not added",
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         error: error.message,
//       });
//     }
//   };


//   module.exports ={ addcard,}
  
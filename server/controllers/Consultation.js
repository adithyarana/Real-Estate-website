import prisma from "../libs/prisma.js";
export const Createconsultation = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        suscess: false,
        message: "Invalid phone number. Must be exactly 10 digits.",
      });
    }

    const consultation = await prisma.consultation.create({
      data: {
        phone,
      },
    });


    const existingphonumber = await prisma.consultation.findFirst({
      where: {
        phone,
      },
    })

    if(existingphonumber){
      return res.status(200).json({
        message: true,
        message: "Phone number already exists",
        data: consultation,
      });
    }

    return res.status(200).json({
      message: true,
      message: "consultation created successfully",
      data: consultation,
    });
  } catch (error) {
    console.log("consultation error", error.message);
    res.status(499).json({
      message: false,
      message: error.message,
    });
  }
};

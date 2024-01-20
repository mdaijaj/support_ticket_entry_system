const SupportTicketModel = require('../models/support_ticket_model')

exports.createSupportTicket = async (req, res) => {
  const {
    topic, assignedTo, severity_level,ticket_type,status,description
  } = req.body;
  try {
    const ticketData = await SupportTicketModel.create({
      topic, assignedTo, severity_level,ticket_type,status,description
    })
    console.log("ticketdata", ticketData)
    return res.status(200).send({
      message: "create successfully!", data: ticketData
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the ticketData."
    });
  }
}



exports.SupportTicketList = async (req, res) => {
  try {
    const ticketData = await SupportTicketModel.find({})
    console.log("ticketData", ticketData)
    if (ticketData.length>0) {
      res.status(200).send({ message: "get all ticketData list", data: ticketData })
    }else{
      res.status(204).send({ message: "data not found", data: ticketData })
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.SupportTicketDetails = async (req, res) => {
  try {
    console.log(req.params.id)
    const restData = await SupportTicketModel.findById({
      _id: req.params.id,
    })
    console.log("restData", restData)
    if (!restData || restData == undefined) {
      return res.send("not found ticket")
    }
    return res.status(200).send({
      message: "user resitered save data",
      data: restData
    })
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.editTicketDetails = async (req, res) => {
  try {

    let obj= req.body
    let mainObj=JSON.parse(obj.body)

    const ticketdata = await SupportTicketModel.find({ _id: req.params.id });
    if (ticketdata) {
      const updateData = await SupportTicketModel.updateOne({ _id: req.params.id }, {
        $set: mainObj
      })
      console.log("updateData", updateData)
      return res.send({ status: "update data successfully! ", "result": updateData })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.deleteTicket = async (req, res) => {
  try {

    const ticketdata = await SupportTicketModel.find({ _id: req.params.id });
    if (ticketdata) {
      const updateData = await SupportTicketModel.findByIdAndRemove({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "Delete data successfully! " })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.paginationData = async (req, res) => {

  let { page, size, sort } = req.query;
  if (!page) {
    page = 1;
  }

  if (!size) {
    size = 10;
  }

  const limit = parseInt(size);
  const user = await SupportTicketModel.find().limit(limit)
  res.send({
    page,
    size,
    Info: user,
  });
}








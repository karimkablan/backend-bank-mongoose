const bankModel = require("../models/bank.model").user;


const getAllUsers = async (req, res) => {
  const data = await bankModel.find({});
  return res.status(200).send(data);
};


const addNewUser = (req, res) => {
  const {
    name,
    email,
    password,
    cash,
    credit,
    acountId,
  } = req.body;

  const user = new bankModel({
    name: name,
    email:email,
    password: password,
    cash: cash,
    credit: credit,
    acountId: acountId,
  });

  user.save((err, data) => {
    if (err) return res.status(404).send(err);
    return res.status(200).send(data);
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  bankModel.findByIdAndDelete(id, (err, data) => {
    if (err) return res.status(404).send(err);
    return res.status(200).send(data);
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    cash,
    credit,
    acountId,
  } = req.body;
  bankModel.findByIdAndUpdate(
    id,
    {
      name: name,
      email: email,
      password: password,
      cash: cash,
      credit: credit,
      acountId: acountId,
    },
    { new: true },
    (err, data) => {
      if (err) return res.status(404).send(err);
      return res.status(200).send(data);
    }
  );
};



const updateCredit = (req, res) => {
  console.log("updateCredit");
  const {
    amount,
    acountId
  } = req.body;
  bankModel.findOne(
    {
      acountId : acountId
    },
    (err, data) => {
      if(data.cash > data.credit && amount >= 0 ){
      if (err) return res.status(404).send(err);
      bankModel.findByIdAndUpdate(
        data._id,
        {
        credit :  amount
        },
        { new: true },
        (err, data) => {
          if (err) return res.status(404).send(err);
          return res.status(200).send(data);
        }
      );
    }
  else{
    return res.status(404).send("wrong value")
  }
  }
  )
};



const withDrawMoney = (req, res) => {
  const {
    amount,
    acountId
  } = req.body;
  bankModel.findOne(
    {
      acountId : acountId
    },
    (err, data) => {
      if(data.cash > amount && amount > 0 && data.cash>0){
      if (err) return res.status(404).send(err);
      bankModel.findByIdAndUpdate(
        data._id,
        {
        cash : data.cash - amount
        },
        { new: true },
        (err, data) => {
          if (err) return res.status(404).send(err);
          return res.status(200).send(data);
        }
      );
    }
    else{
      return res.status(404).send("up to the cash limit")
  }
}
  )
};



const Transferring = (req, res) => {
  const {
    amount,
    acountId,
    acountId2
  } = req.body;
  bankModel.findOne(
    {
      acountId : acountId
    },
    (err, user1) => {
      bankModel.findOne(
        {
          acountId : acountId2
        },
        (err, user2) => {
          
          if (err) return res.status(404).send(err);
          if (user1.cash-amount<-user1.credit){res.status(404)}
          bankModel.findByIdAndUpdate(
            user1._id,
            {
            cash : user1.cash - amount
            },
            { new: true },
            (err,data ) => {
              if (err) return res.status(404).send(err);
              
              bankModel.findByIdAndUpdate(
                user2._id,
                {
                cash : user2.cash + parseInt(amount)
                },
                { new: true },
                (err,data)=>{
                  if(err) return res.status(404).send(err)
                  return res.status(200).send(data);
                }
              )
             
            });
        })
    }
    
    )
}

  
  


const updateMoney = (req, res) => {
  console.log("updateMoney");
  const {
    amount,
    acountId
  } = req.body;
  bankModel.findOne(
    {
      acountId : acountId
    },
    (err, data) => {
      if (err) return res.status(404).send(err);
      bankModel.findByIdAndUpdate(
        data._id,
        {
        cash : data.cash + +amount
        },
        { new: true },
        (err, data) => {
          if (err) return res.status(404).send(err);
          return res.status(200).send(data);
        }
      );
    }
  )
};



module.exports = {
  getAllUsers,
  addNewUser,
  deleteUser,
  updateUser,
  updateMoney,
  updateCredit,
  withDrawMoney,
  Transferring
};

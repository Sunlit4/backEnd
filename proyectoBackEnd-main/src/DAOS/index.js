import ProductDaoMongo from "./product/ProductDaoMongo.js";
import CartDaoMongo from "./cart/CartDaoMongo.js";
import OrderDaoMongo from "./order/OrderDaoMongo.js";
import MessageDaoMongo from "./chat/ChatDaoMongo.js"
import UserDaoMongo from "./user/UserDaoMongo.js";

let ProductDAO = null
let CartDAO = null
let OrderDAO = null;
let ChatDAO = null;
let UserDAO = null;

ProductDAO = ProductDaoMongo.getInstance();
CartDAO = CartDaoMongo.getInstance();
OrderDAO = OrderDaoMongo.getInstance();
ChatDAO = MessageDaoMongo.getInstance();
UserDAO = UserDaoMongo.getInstance();

export{ProductDAO, CartDAO, OrderDAO, ChatDAO, UserDAO}
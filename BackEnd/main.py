from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, joinedload
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()

# --- Configuração do banco de dados ---
DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# --- Modelando as Tabelas ---
class Cart(Base):
    __tablename__ = "carts"
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer)
    date = Column(String)
    total_products = Column(Integer)
    products = relationship("CartProduct", back_populates="cart", cascade="all, delete-orphan")

class CartProduct(Base):
    __tablename__ = "cart_products"
    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer, ForeignKey("carts.id"), index=True)
    productId = Column(Integer)
    quantity = Column(Integer)

    cart = relationship("Cart", back_populates="products")

Base.metadata.create_all(bind=engine)

# --- Rota para importar dados da FakeStore ---
@app.get("/import")
def import_carts():
    url = "https://fakestoreapi.com/carts"
    response = requests.get(url)
    carts_data = response.json()

    db = SessionLocal()
    db.query(CartProduct).delete()
    db.query(Cart).delete()  
    
    for cart in carts_data:
        total_products = sum([p["quantity"] for p in cart["products"]])
        new_cart = Cart(
            id=cart["id"],
            userId=cart["userId"],
            date=cart["date"],
            total_products=total_products
        )
        db.add(new_cart)

        for p in cart["products"]:
            item = CartProduct(
                cart_id=cart["id"],
                productId=p["productId"],
                quantity=p["quantity"]
            )
            db.add(item)

    db.commit()
    db.close()
    return {"message": "carrinhos e produtos importados com sucesso!", "code": 200}


# --- Endpoints ---

# Endpoint para puxar todos os carrinhos
@app.get("/carts")
def get_all_carts():
    db = SessionLocal()
    carts = db.query(Cart).all()
    db.close()
    return carts

# Endpoint para puxar um carrinho específico e mostrar seus produtos
@app.get("/carts/{cart_id}")
def get_cart(cart_id: int):
    db = SessionLocal()
    cart = (
        db.query(Cart)
        .options(joinedload(Cart.products))
        .filter(Cart.id == cart_id)
        .first()
    )
    if not cart:
        db.close()
        raise HTTPException(status_code=404, detail="Carrinho não encontrado")

    result = {
        "id": cart.id,
        "userId": cart.userId,
        "date": cart.date,
        "total_products": cart.total_products,
        "products": [
            {"productId": p.productId, "quantity": p.quantity} for p in cart.products
        ],
    }

    db.close()
    return result

app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
)

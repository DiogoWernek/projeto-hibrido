from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import requests

app = FastAPI()

# --- Configuração do banco de dados ---
DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Cart(Base):
    __tablename__ = "carts"
    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer)
    date = Column(String)
    total_products = Column(Integer)

Base.metadata.create_all(bind=engine)

# --- Rota para importar dados da FakeStore ---
@app.get("/import")
def import_carts():
    url = "https://fakestoreapi.com/carts"
    response = requests.get(url)
    carts_data = response.json()

    db = SessionLocal()
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

    db.commit()
    db.close()
    return {"message": f"{len(carts_data)} carrinhos importados com sucesso!"}


# --- Endpoints ---
@app.get("/carts")
def get_all_carts():
    db = SessionLocal()
    carts = db.query(Cart).all()
    db.close()
    return carts


@app.get("/carts/{cart_id}")
def get_cart(cart_id: int):
    db = SessionLocal()
    cart = db.query(Cart).filter(Cart.id == cart_id).first()
    db.close()
    if not cart:
        raise HTTPException(status_code=404, detail="Carrinho não encontrado")
    return cart

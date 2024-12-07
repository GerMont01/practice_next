import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

const setSessionCookie = async (items) => {
    cookies().set({
        name: 'cartItems',
        value: JSON.stringify(items),
        maxAge: 3600*24*10,
        httpOnly: true,
    });
}

const getNumOfItems = (cartItems) => {
    let num_of_items = 0
    for (let item of cartItems) {
        num_of_items += item.quantity
    }
    return num_of_items
}

const getStoredItems = async () => {
    const cookieStore = await cookies()
    const storedCartItems = cookieStore.get('cartItems')
    if (storedCartItems) return JSON.parse(storedCartItems.value)
    else return []
}


export async function POST(req) {
    let cartItems = await getStoredItems()
    const newItem = await req.json()

    const isInCar = () => {
        for (let item of cartItems) {
            if (item.id === newItem.id) {
                item.quantity +=1
                return true
            }
        }
        return false
    }

    const is_in_car = isInCar()

    if (!is_in_car) {
        newItem.quantity = 1
        cartItems.push({
            id:newItem.id,
            name:newItem.name,
            picture: newItem.picture,
            quantity:newItem.quantity,
            price:newItem.price
        })
    }

    setSessionCookie(cartItems)
    return NextResponse.json({ message: 'Item added to cart', cart: cartItems, num_of_items: getNumOfItems(cartItems)}, {
        status: 200,
        });
    // res.status(201).json({ message: 'Item added to cart', cart: cartItems, num_of_items: getNumOfItems()})
}
export async function GET(req) {
    let cartItems = await getStoredItems()
    console.log(cartItems)
    try {
        return NextResponse.json({cart:cartItems,num_of_items:getNumOfItems(cartItems)}, {
            status: 200,
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: error },
            {
              status: 500,
            }
          );
    }
            // res.status(200).json({cart:cartItems,num_of_items:getNumOfItems()})
}
export async function DELETE(req) {
    let cartItems = await getStoredItems()
    const id = await req.json()
    cartItems = cartItems.filter(item => {
        if (item.id !== id) {
            return true
        } else {
            if (item.quantity > 1) {
                item.quantity -= 1
                return true
            }
            else return false
        }
    })

    setSessionCookie(cartItems)
    return NextResponse.json({ message: 'Item removed from cart', cart: cartItems, num_of_items: getNumOfItems(cartItems)}, {
        status: 200,
        });
    // res.status(200).json({ message: 'Item removed from cart', cart: cartItems, num_of_items: getNumOfItems()})
}
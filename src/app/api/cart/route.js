import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

let cartItems = [];

// const setSessionCookie = async (items) => {
//   cookies().set({
//     name: 'cartItems',
//     value: items,
//     httpOnly: true,
//   });
// }

const getNumOfItems = () => {
    let num_of_items = 0
    for (let item of cartItems) {
        num_of_items += item.quantity
    }
    return num_of_items
}

    // const cookieStore = await cookies()
    // const storedCartItems = cookieStore.get('cartItems')

    // if (storedCartItems) {
    //     cartItems = storedCartItems
    // }

export async function POST(req) {
    const newItem = await req.json()

    const isInCar = () => {
        for (let item of cartItems) {
            if (item.name === newItem.name) {
                item.quantity +=1
                return true
            }
        }
        return false
    }

    const is_in_car = isInCar()

    if (!is_in_car) {
        newItem.quantity = 1
        cartItems.push(newItem)
    }

    // setSessionCookie(cartItems)
    return NextResponse.json({ message: 'Item added to cart', cart: cartItems, num_of_items: getNumOfItems()}, {
        status: 200,
        });
    // res.status(201).json({ message: 'Item added to cart', cart: cartItems, num_of_items: getNumOfItems()})
}
export async function GET(req) {
    try {
        return NextResponse.json({cart:cartItems,num_of_items:getNumOfItems()}, {
            status: 200,
        });
    } catch (error) {
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

            // setSessionCookie(cartItems)
            return NextResponse.json({ message: 'Item removed from cart', cart: cartItems, num_of_items: getNumOfItems()}, {
                status: 200,
              });
            // res.status(200).json({ message: 'Item removed from cart', cart: cartItems, num_of_items: getNumOfItems()})
    }
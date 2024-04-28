import React from "react";

/* we can destructure the onUpdateItem prop and call 
it when we have the updated item response from the server: */

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Add function to handle button click
  function handleAddToCartClick() {
    // add fetch request when the function is called:
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }) /* This means that if the item is currently in the cart, the isInCart property will be set to false, and if the item is not currently in the cart, the isInCart property will be set to true.
      The resulting JSON string is then sent to the server as the body of the PATCH request.
      The server will use this information to update the item's isInCart property in its database. */,
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  //callback function to delete an item/remove items from their shopping list:

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        onClick={handleAddToCartClick}
        className={item.isInCart ? "remove" : "add"}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;

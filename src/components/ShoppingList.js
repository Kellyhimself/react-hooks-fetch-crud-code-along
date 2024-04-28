import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  //defining the selected category and items state for use in filter and list rendering
  //respectively
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Update items state by passing the array of items to setItems
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items)); //updating the state of items
  }, []);

  /* Since the ShoppingList component is a parent component
   to the ItemForm component,  we'll need to pass a callback 
   function as a prop so that the ItemForm component can send
   the new item up to the ShoppingList.*/

  //Let's add a handleAddItem function to ShoppingList,
  //and pass a reference to that function as a prop
  //called onAddItem to the ItemForm:

  function handleAddItem(newItem) {
    setItems([...items, newItem]); //using spread to update the new Array
  }
  // callback function for updating an item/ adding and removing item from cart
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  // add this callback function to remove an item from shopping list
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      {/*passing onAddItem as reference to that function (handleAddItem) as a prop */}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/*passing onUpd
      <ul className="Items">
        {/*passing onUpdateItem and onDeleteItem as reference to that function (handleUpdateItem) as a prop */}
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            onUpdateItem={handleUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

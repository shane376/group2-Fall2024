// Initialize cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a book to the cart
function addToCart(book) {
    // Add the new book to the cart
    cart.push(book);

    // Save the updated cart back into localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${book.title} has been added to your cart.`);
}

// Function to remove a book from the cart
function removeFromCart(bookTitle) {
    // Remove the item from the cart array
    cart = cart.filter((item) => item.title !== bookTitle);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Provide feedback and update the displayed cart
    alert(`${bookTitle} has been removed from your cart.`);
    displayCart();
}

// Function to display the cart items on the cart.html page
function displayCart() {
    // Retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the container for displaying cart items
    const cartContainer = document.getElementById('cart-items');

    // Clear the container
    cartContainer.innerHTML = '';

    // Check if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = '<li>Your cart is empty.</li>';
        return;
    }

    // Populate the cart items
    cart.forEach((book) => {
        const listItem = document.createElement('li');
        listItem.textContent = book.title;

        // Add a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        removeButton.onclick = () => removeFromCart(book.title);

        // Append the button to the list item
        listItem.appendChild(removeButton);
        cartContainer.appendChild(listItem);
    });
}

window.onload = function() {
    fetch('/members-list')
        .then(response => response.json())
        .then(members => {
            const membersTable = document.getElementById('members-table');
            members.forEach(member => {
                const row = membersTable.insertRow();
                row.innerHTML = `<td>${member.full_name}</td>
                                 <td>${member.email}</td>
                                 <td>${member.date_joined}</td>
                                 <td>${member.membership_status}</td>`;
            });
        });
};

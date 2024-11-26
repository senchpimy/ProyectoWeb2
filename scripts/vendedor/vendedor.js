import {supabase} from './../Base de datos/supabase.js';

const tablaProductos = document.getElementById('tabla-productos');
const productForm = document.getElementById('productForm');

const openModal = document.getElementById('openModal');
        const closeModal = document.getElementById('closeModal');
        const modal = document.getElementById('productModal');

        // Open modal
        openModal.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal if clicked outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });


// Función para cargar los productos desde Supabase
async function loadProducts() {
    const { data: productos, error } = await supabase
        .from('productos') // Cambia 'productos' por el nombre de tu tabla
        .select('*');

    if (error) {
        console.error('Error al cargar productos:', error);
        return;
    }

    // Limpia la tabla antes de agregar nuevos datos
    const rows = tablaProductos.querySelectorAll('tr:not(:first-child)');
    rows.forEach(row => row.remove());

    // Agrega productos a la tabla
    productos.forEach(productos => {
        const row = tablaProductos.insertRow();

        // Columna de imagen
        const imgCell = row.insertCell(0);
        const img = document.createElement('img');
        img.src = productos.image_url; // Asegúrate de tener un campo 'image_url' en tu tabla
        img.alt = "supuestamente aqui va una imagen";
        img.style.width = '50px';
        imgCell.appendChild(img);

        // Columna de nombre
        const nameCell = row.insertCell(1);
        nameCell.textContent = productos.nombre;

        // Columna de acciones
        const actionsCell = row.insertCell(2);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => deleteProduct(product.id));
        actionsCell.appendChild(deleteBtn);
    });
}

// Función para eliminar un producto
async function deleteProduct(id) {
    const { error } = await supabase
        .from('productos') // Cambia 'productos' por el nombre de tu tabla
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error al eliminar producto:', error);
        return;
    }

    alert('Producto eliminado.');
    loadProducts(); // Recarga los productos para actualizar la tabla
}

// Carga los productos al iniciar
document.addEventListener('DOMContentLoaded', loadProducts);

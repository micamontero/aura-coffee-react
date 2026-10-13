import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ProductRow({ product, handleEdit, handleDelete }) {
    return (
        <tr>
            <td>
                <img src={product.image} alt={product.name} />
            </td>
            <td>
                <span className="product-name">{product.name}</span>
                <span className="product-category">{product.category}</span>
                <p className="product-description">{product.description}</p>
            </td>
            <td>
                <span className="product-date">
                    {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString('es-AR')
                        : '-'}
                </span>
            </td>
            <td>
                <span className="product-price">${product.price?.toLocaleString('es-AR')}</span>
            </td>
            <td>
                <div className="table-actions">
                    <button className="btn-edit" onClick={() => handleEdit(product.id)}>
                        <FontAwesomeIcon icon={faEdit} /> Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Borrar
                    </button>
                </div>
            </td>
        </tr>
    )
}
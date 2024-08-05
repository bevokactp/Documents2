import React from 'react';
import { products, rhythms, meters  } from '../constants';

const Products = () => {
    // Преобразуем объект products в массив для удобства отображения в таблице
    const productsArray = Object.keys(products).map(key => products[key]);

    // Функция для получения имён ритмов по ключам
    const getRhythmsNames = (keys) => keys.map(key => rhythms[key]?.name || 'Unknown').join(', ');

    // Функция для получения имён метров по ключам
    const getMetersNames = (ids) => ids.map(id => meters[id]?.name || 'Unknown').join(', ');

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Структура</th>
                        <th>Рифмовка</th>
                        <th>Метры</th>
                    </tr>
                </thead>
                <tbody>
                    {productsArray.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.structure}</td>
                            <td>{getRhythmsNames(product.rhythms_keys)}</td>
                            <td>{getMetersNames(product.meters_ids)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;

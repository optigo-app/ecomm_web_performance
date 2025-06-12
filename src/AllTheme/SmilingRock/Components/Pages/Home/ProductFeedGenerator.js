import React, { useEffect, useState } from 'react';
import { Download, Plus, Trash2, Eye, FileText, Code, Database, PencilLine } from 'lucide-react';
import './ProductFeedGenerator.scss';
import { useRecoilValue } from 'recoil';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie'
import { smr_loginState } from '../../Recoil/atom';
import ProductListApi from '../../../../../utils/API/ProductListAPI/ProductListApi';
import { formatRedirectTitleLine } from '../../../../../utils/Glob_Functions/GlobalFunction';
import pako from "pako";

const ProductFeedGenerator = () => {

    const secretKey = '5Xeron';
    const islogin = useRecoilValue(smr_loginState);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    let cookie = Cookies.get('visiterId')
    const getProductFeedsData = sessionStorage.getItem("productfeed");

    const [selectedMetalId, setSelectedMetalId] = useState(islogin ? loginUserDetail?.MetalId : storeinit?.MetalId);
    const [selectedDiaId, setSelectedDiaId] = useState(islogin ? loginUserDetail?.cmboDiaQCid : storeinit?.cmboDiaQCid);
    const [selectedCsId, setSelectedCsId] = useState(islogin ? loginUserDetail?.cmboCSQCid : storeinit?.cmboCSQCid);
    const [dynProducts, setDynProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAPiCalled, setIsApiCalled] = useState(false);
    const [products, setProducts] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };

        const fetchProductData = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchData = await ProductListApi({}, "", obj, [], cookie);
                const data = fetchData?.pdList || [];
                setDynProducts(data);
            } catch (err) {
                setError("Failed to fetch products");
                console.error("Error fetching product data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isAPiCalled) {
            fetchProductData();
        }
    }, [selectedMetalId, selectedDiaId, selectedCsId, cookie, isAPiCalled]);

    // const [products, setProducts] = useState([
    //     {
    //         id: 'JW001',
    //         title: '22KT Gold Necklace Set',
    //         description: 'Elegant 22KT gold necklace set with traditional Indian craftsmanship, perfect for weddings and special occasions.',
    //         link: 'https://yourstore.com/product/22kt-gold-necklace',
    //         image_link: 'https://yourstore.com/images/22kt-gold-necklace.jpg',
    //         availability: 'in_stock',
    //         price: '86500.00 INR',
    //         brand: 'GoldCraft',
    //         condition: 'new',
    //         sale_price: '82999.00 INR',
    //         product_type: 'Jewelry > Necklaces',
    //         google_product_category: '189'
    //     },
    //     {
    //         id: 'JW002',
    //         title: 'Diamond Stud Earrings',
    //         description: 'Classic round-cut diamond stud earrings set in 18KT white gold, perfect for daily elegance.',
    //         link: 'https://yourstore.com/product/diamond-stud-earrings',
    //         image_link: 'https://yourstore.com/images/diamond-earrings.jpg',
    //         availability: 'in_stock',
    //         price: '32999.00 INR',
    //         brand: 'ShineStone',
    //         condition: 'new',
    //         sale_price: '',
    //         product_type: 'Jewelry > Earrings',
    //         google_product_category: '188'
    //     },
    //     {
    //         id: 'JW003',
    //         title: 'Gold Plated Bracelet',
    //         description: 'Stylish gold plated bracelet with intricate designs for a modern traditional look.',
    //         link: 'https://yourstore.com/product/gold-plated-bracelet',
    //         image_link: 'https://yourstore.com/images/gold-bracelet.jpg',
    //         availability: 'in_stock',
    //         price: '1499.00 INR',
    //         brand: 'Ornate',
    //         condition: 'new',
    //         sale_price: '1299.00 INR',
    //         product_type: 'Jewelry > Bracelets',
    //         google_product_category: '188'
    //     }
    // ]);

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);

            const compressed = pako.deflate(uint8Array, { to: 'string' });


            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const decodeAndDecompress = (encodedString) => {
        try {
            // Decode the Base64 string to binary data
            const binaryString = atob(encodedString);

            // Convert binary string to Uint8Array
            const uint8Array = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i);
            }

            // Decompress the data
            const decompressed = pako.inflate(uint8Array, { to: 'string' });

            // Convert decompressed data back to JSON object
            const jsonObject = JSON.parse(decompressed);

            return jsonObject;
        } catch (error) {
            console.error('Error decoding and decompressing:', error);
            return null;
        }
    };

    const transformProducts = (rawProducts) => {

        let obj = {
            a: rawProducts?.autocode,
            b: rawProducts?.designno,
            m: selectedMetalId,
            d: selectedDiaId,
            c: selectedCsId,
        }

        decodeAndDecompress()

        let encodeObj = compressAndEncode(JSON.stringify(obj))

        return rawProducts.map((item) => ({
            id: item?.designno || `D${item?.DesignId}`, // fallback ID
            title: item?.TitleLine || 'Jewellery Design',
            description: item?.description || `Made with ${item.MetalPurityid === 2 ? '18K' : '22K'} gold, ${item.Dwt || 0}ct diamonds`,
            link: `${window.location.origin}/d/${formatRedirectTitleLine(item?.TitleLine)}${item?.designno}?p=${encodeObj}`,
            image_link: `${storeinit?.CDNDesignImageFolThumb}${item?.designno}~1.jpg`,
            availability: item.IsInReadyStock ? 'in_stock' : 'out_of_stock',
            price: `${item.UnitCostWithMarkUpIncTax || item.UnitCostWithMarkUp || 0} INR`,
            brand: item.collection || 'YourBrand',
            condition: 'new',
            sale_price: '', // Optional: fill this if discount data is available
            product_type: `Jewelry > ${item.category || 'General'}`,
            google_product_category: '188', // You can map based on `Categoryid` if needed
        }));
    };

    useEffect(() => {
        if (dynProducts.length > 0 && isAPiCalled === true) {
            const mapped = transformProducts(dynProducts);
            setProducts(mapped); // this will replace your default `products`
        } else if (
            getProductFeedsData &&
            typeof getProductFeedsData === 'string' &&
            getProductFeedsData.trim() !== '' &&
            isAPiCalled === false
        ) {
            try {
                const bytes = CryptoJS.AES.decrypt(getProductFeedsData, secretKey);
                const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

                if (decryptedText) {
                    const decryptedData = JSON.parse(decryptedText);
                    setProducts(decryptedData);
                } else {
                    console.warn('Decryption failed: Empty result');
                }
            } catch (error) {
                console.error('Decryption error:', error);
            }
        } else if (!getProductFeedsData && isAPiCalled === false) {
            setProducts([]);
        }
    }, [dynProducts, isAPiCalled]);

    const [newProduct, setNewProduct] = useState({
        id: '',
        title: '',
        description: '',
        link: '',
        image_link: '',
        availability: 'in_stock',
        price: '',
        brand: '',
        condition: 'new',
        sale_price: '',
        product_type: '',
        google_product_category: ''
    });

    const [activeTab, setActiveTab] = useState('csv');

    const SubmitProduct = () => {
        let updatedProducts;

        if (editIndex !== null) {
            updatedProducts = [...products];
            updatedProducts[editIndex] = newProduct;
            setEditIndex(null); // reset editIndex
        } else {
            updatedProducts = [...products, newProduct];
        }

        if (newProduct.id && newProduct.title && newProduct.price) {
            setProducts(updatedProducts);
            setNewProduct({
                id: '',
                title: '',
                description: '',
                link: '',
                image_link: '',
                availability: 'in_stock',
                price: '',
                brand: '',
                condition: 'new',
                sale_price: '',
                product_type: '',
                google_product_category: ''
            });
            const encryptedData = CryptoJS.AES.encrypt(
                JSON.stringify(updatedProducts),
                secretKey
            ).toString();
            sessionStorage.setItem("productfeed", encryptedData);
        } else {
            if (newProduct.id === "") {
                setError("Please Fill Product ID")
            }
            if (newProduct.title === "") {
                setError("Please Fill Product title")
            }
            if (newProduct.price === "") {
                setError("Please Fill Product price")
            }
            return;
        }
    };

    const removeProduct = (index) => {
        const removeData = products.filter((_, i) => i !== index);
        setProducts(removeData);
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(removeData), secretKey).toString();
        sessionStorage.setItem("productfeed", encryptedData);
    };

    const editProduct = (index) => {
        const productToEdit = products[index];
        setNewProduct(productToEdit);
        setEditIndex(index); // track which product is being edited
    };

    const generateCSVFeed = () => {
        const headers = [
            'id', 'title', 'description', 'link', 'image_link',
            'availability', 'price', 'brand', 'condition',
            'sale_price', 'product_type', 'google_product_category'
        ];

        const csvContent = [
            headers.join(','),
            ...products.map(product =>
                headers.map(header =>
                    `"${product[header] || ''}"`
                ).join(',')
            )
        ].join('\n');

        return csvContent;
    };

    const generateXMLFeed = () => {
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Your Store Product Feed</title>
    <link>https://yourstore.com</link>
    <description>Product feed for Google Shopping</description>
    ${products.map(product => `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.title}]]></g:title>
      <g:description><![CDATA[${product.description}]]></g:description>
      <g:link>${product.link}</g:link>
      <g:image_link>${product.image_link}</g:image_link>
      <g:availability>${product.availability}</g:availability>
      <g:price>${product.price}</g:price>
      <g:brand>${product.brand}</g:brand>
      <g:condition>${product.condition}</g:condition>
      ${product.sale_price ? `<g:sale_price>${product.sale_price}</g:sale_price>` : ''}
      ${product.product_type ? `<g:product_type>${product.product_type}</g:product_type>` : ''}
      ${product.google_product_category ? `<g:google_product_category>${product.google_product_category}</g:google_product_category>` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

        return xmlContent;
    };

    const generateAPIEndpoint = () => {
        return `// Express.js API endpoint example
app.get('/api/product-feed', (req, res) => {
  const products = [
    ${products.map(product => `{
      id: "${product.id}",
      title: "${product.title}",
      description: "${product.description}",
      link: "${product.link}",
      image_link: "${product.image_link}",
      availability: "${product.availability}",
      price: "${product.price}",
      brand: "${product.brand}",
      condition: "${product.condition}",
      sale_price: "${product.sale_price}",
      product_type: "${product.product_type}",
      google_product_category: "${product.google_product_category}"
    }`).join(',\n    ')}
  ];
  
  res.json({
    products: products,
    total: products.length,
    generated_at: new Date().toISOString()
  });
});`;
    };

    const downloadFeed = (content, filename, type) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="product-feed-generator">
            <div className='product-feed-generator__header-div'>
                <div className="product-feed-generator__header">
                    <h1 className="product-feed-generator__header-title">
                        Google Shopping Product Feed Generator
                    </h1>
                    <p className="product-feed-generator__header-description">
                        Create CSV, XML, or API feeds for Google Merchant Center integration
                    </p>
                </div>
                <div>
                    <div class="switch-holder">
                        <div class="switch-label">
                            <i class="fa fa-bluetooth-b"></i><span>API Call</span>
                        </div>
                        <div className="switch-toggle">
                            <input
                                type="checkbox"
                                id="bluetooth"
                                checked={isAPiCalled}
                                onChange={() => setIsApiCalled(prev => !prev)}
                            />
                            <label htmlFor="bluetooth"></label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Product Form */}
            <div className="product-feed-generator__add-product">
                <h2 className="product-feed-generator__add-product-title">
                    <Plus className="icon" />
                    Add New Product
                </h2>
                <div className="product-feed-generator__add-product-form">
                    <input
                        type="text"
                        placeholder="Product ID (required)"
                        value={newProduct.id}
                        onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <input
                        type="text"
                        placeholder="Product Title (required)"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <input
                        type="text"
                        placeholder="Price (required) e.g, 30490.00 INR"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <input
                        type="text"
                        placeholder="Brand"
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <input
                        type="url"
                        placeholder="Product URL"
                        value={newProduct.link}
                        onChange={(e) => setNewProduct({ ...newProduct, link: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <input
                        type="url"
                        placeholder="Image URL"
                        value={newProduct.image_link}
                        onChange={(e) => setNewProduct({ ...newProduct, image_link: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <select
                        value={newProduct.availability}
                        onChange={(e) => setNewProduct({ ...newProduct, availability: e.target.value })}
                        className="product-feed-generator__add-product-select"
                    >
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="preorder">Pre-order</option>
                    </select>
                    <select
                        value={newProduct.condition}
                        onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
                        className="product-feed-generator__add-product-select"
                    >
                        <option value="new">New</option>
                        <option value="refurbished">Refurbished</option>
                        <option value="used">Used</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Sale Price (optional)"
                        value={newProduct.sale_price}
                        onChange={(e) => setNewProduct({ ...newProduct, sale_price: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <input
                        type="text"
                        placeholder="Product Type (optional)"
                        value={newProduct.product_type}
                        onChange={(e) => setNewProduct({ ...newProduct, product_type: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <input
                        type="text"
                        placeholder="Google Category ID (optional)"
                        value={newProduct.google_product_category}
                        onChange={(e) => setNewProduct({ ...newProduct, google_product_category: e.target.value })}
                        className="product-feed-generator__add-product-input"
                    />
                    <textarea
                        placeholder="Product Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="product-feed-generator__add-product-input product-feed-generator__add-product-input--textarea"
                        rows="3"
                    />
                </div>
                <button
                    onClick={SubmitProduct}
                    className="product-feed-generator__add-product-button"
                >
                    <Plus className="icon" />
                    {editIndex === null ? "Add Product" : "Edit Product"}
                </button>
            </div>

            {/* Product List */}
            <div className="product-feed-generator__product-list">
                <h2 className="product-feed-generator__product-list-title">
                    Current Products ({products.length})
                </h2>
                <div className="product-feed-generator__product-list-items">
                    {loading ?
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                            <div className="css-loader"></div>
                        </div> :
                        <>
                            {products.map((product, index) => (
                                <div key={index} className="product-feed-generator__product-item fade-in">
                                    <div className="product-feed-generator__product-item-content">
                                        <div className="product-feed-generator__product-item-details">
                                            <h3 className="product-feed-generator__product-item-title">{product.title}</h3>
                                            <p className="product-feed-generator__product-item-description">{product.description}</p>
                                            <div className="product-feed-generator__product-item-meta">
                                                <span><strong>ID:</strong> {product.id}</span>
                                                <span><strong>Price:</strong> {product.price}</span>
                                                <span><strong>Brand:</strong> {product.brand}</span>
                                                <span><strong>Status:</strong> {product.availability}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => removeProduct(index)}
                                                className="product-feed-generator__product-item-delete"
                                            >
                                                <Trash2 className="icon" />
                                            </button>
                                            <button
                                                onClick={() => editProduct(index)}
                                                className="product-feed-generator__product-item-delete"
                                            >
                                                <PencilLine className="icon" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }

                </div>
            </div>

            {/* Feed Generation Tabs */}
            <div className="product-feed-generator__feed-generator">
                <div className="product-feed-generator__feed-generator-tabs">
                    <button
                        onClick={() => setActiveTab('csv')}
                        className={`product-feed-generator__feed-generator-tab ${activeTab === 'csv' ? 'product-feed-generator__feed-generator-tab--active' : ''
                            }`}
                    >
                        <FileText className="icon" />
                        CSV Feed
                    </button>
                    <button
                        onClick={() => setActiveTab('xml')}
                        className={`product-feed-generator__feed-generator-tab ${activeTab === 'xml' ? 'product-feed-generator__feed-generator-tab--active' : ''
                            }`}
                    >
                        <Code className="icon" />
                        XML Feed
                    </button>
                    <button
                        onClick={() => setActiveTab('api')}
                        className={`product-feed-generator__feed-generator-tab ${activeTab === 'api' ? 'product-feed-generator__feed-generator-tab--active' : ''
                            }`}
                    >
                        <Database className="icon" />
                        API Endpoint
                    </button>
                </div>

                <div className="product-feed-generator__feed-generator-content">
                    {activeTab === 'csv' && (
                        <div>
                            <div className="product-feed-generator__feed-generator-header">
                                <h3 className="product-feed-generator__feed-generator-title">CSV Product Feed</h3>
                                <button
                                    onClick={() => downloadFeed(generateCSVFeed(), 'product-feed.csv', 'text/csv')}
                                    className="product-feed-generator__feed-generator-download"
                                >
                                    <Download className="icon" />
                                    Download CSV
                                </button>
                            </div>
                            <pre className="product-feed-generator__feed-generator-code">
                                {generateCSVFeed()}
                            </pre>
                        </div>
                    )}

                    {activeTab === 'xml' && (
                        <div>
                            <div className="product-feed-generator__feed-generator-header">
                                <h3 className="product-feed-generator__feed-generator-title">XML Product Feed</h3>
                                <button
                                    onClick={() => downloadFeed(generateXMLFeed(), 'product-feed.xml', 'application/xml')}
                                    className="product-feed-generator__feed-generator-download"
                                >
                                    <Download className="icon" />
                                    Download XML
                                </button>
                            </div>
                            <pre className="product-feed-generator__feed-generator-code">
                                {generateXMLFeed()}
                            </pre>
                        </div>
                    )}

                    {activeTab === 'api' && (
                        <div>
                            <div className="product-feed-generator__feed-generator-header">
                                <h3 className="product-feed-generator__feed-generator-title">API Endpoint Code</h3>
                                <button
                                    onClick={() => downloadFeed(generateAPIEndpoint(), 'product-feed-api.js', 'application/javascript')}
                                    className="product-feed-generator__feed-generator-download"
                                >
                                    <Download className="icon" />
                                    Download Code
                                </button>
                            </div>
                            <pre className="product-feed-generator__feed-generator-code">
                                {generateAPIEndpoint()}
                            </pre>
                        </div>
                    )}
                </div>
            </div>

            {/* Implementation Guide */}
            {/* <div className="product-feed-generator__implementation-guide">
                <h3 className="product-feed-generator__implementation-guide-title">Implementation Notes</h3>
                <div className="product-feed-generator__implementation-guide-content">
                    <p><strong>Required Fields:</strong> id, title, description, link, image_link, availability, price, brand, condition</p>
                    <p><strong>Optional but Recommended:</strong> sale_price, product_type, google_product_category</p>
                    <p><strong>Price Format:</strong> Include currency (e.g., "30490.00 INR")</p>
                    <p><strong>Image Requirements:</strong> Minimum 100x100px, maximum 64MB, formats: JPEG, PNG, GIF, BMP, TIFF</p>
                    <p><strong>Google Category IDs:</strong> Use Google's product taxonomy (278 = Computers & Accessories -- Computer Components -- Laptops)</p>
                </div>
            </div> */}
        </div>
    );
};

export default ProductFeedGenerator;
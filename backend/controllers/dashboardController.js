const Product = require('../models/Product');
const Contact = require('../models/Contact');
const Order = require('../models/Order');
const ProductImage = require('../models/ProductImage');

const getMonthlyStats = async (model, dateField) => {
    // Group data by month and count occurrences
    const stats = await model.aggregate([
        {
            $group: {
                _id: { year: { $year: `$${dateField}` }, month: { $month: `$${dateField}` } },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ]);
    return stats.map(item => ({
        year: item._id.year,
        month: item._id.month,
        count: item.count
    }));
};

exports.getDashboardData = async (req, res) => {
    try {
        // Total counts
        const totalContacts = await Contact.countDocuments({});
        const totalProducts = await Product.countDocuments({});
        const totalOrders = await Order.countDocuments({});
        const totalImages = await ProductImage.countDocuments({});

        // Monthly stats for graphing
        const contactStats = await getMonthlyStats(Contact, 'createdAt');
        const orderStats = await getMonthlyStats(Order, 'createdAt');
        const productStats = await getMonthlyStats(Product, 'createdAt');
        const productImagesStats = await getMonthlyStats(ProductImage, 'createdAt');


        res.json({
            totals: {
                totalContacts,
                totalProducts,
                totalOrders,
                totalImages
            },
            stats: {
                contact: contactStats,
                orders: orderStats,
                products: productStats,
                images: productImagesStats
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

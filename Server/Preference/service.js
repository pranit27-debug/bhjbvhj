const User = require('../Auth/auth.model');

const getPreferences = async (userId) => {
    const user = await User.findById(userId).select('preferences');
    if (!user) throw new Error('User not found');
    return user.preferences;
};

const updatePreferences = async (userId, updates) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (updates.categories !== undefined) {
        user.preferences.categories = updates.categories;
    }

    if (updates.notifyFrequency !== undefined) {
        user.preferences.notifyFrequency = updates.notifyFrequency;
    }

    await user.save();
    return user.preferences;
};

const getCategories = async () => {
    // Return predefined categories
    return [
        'Electronics',
        'Tools',
        'Sports Equipment',
        'Books',
        'Clothing',
        'Furniture',
        'Kitchen Appliances',
        'Garden Tools',
        'Musical Instruments',
        'Camping Gear',
        'Party Supplies',
        'Art Supplies',
        'Automotive',
        'Baby Items',
        'Pet Supplies'
    ];
};

const resetPreferences = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.preferences = {
        categories: [],
        notifyFrequency: 'instant'
    };

    await user.save();
    return user.preferences;
};

module.exports = {
    getPreferences,
    updatePreferences,
    getCategories,
    resetPreferences,
};

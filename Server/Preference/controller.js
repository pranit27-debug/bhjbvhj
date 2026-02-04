const { getPreferences, updatePreferences } = require('./service');

exports.getPreferences = async (req, res) => {
    try {
        const preferences = await getPreferences(req.user.id);
        res.json({ success: true, preferences });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        const preferences = await updatePreferences(req.user.id, req.body);
        res.json({ success: true, preferences });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await getCategories();
        res.json({ success: true, categories });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.resetPreferences = async (req, res) => {
    try {
        const preferences = await resetPreferences(req.user.id);
        res.json({ success: true, preferences });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

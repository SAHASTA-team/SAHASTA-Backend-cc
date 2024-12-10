const tf = require('@tensorflow/tfjs-node');

module.exports = async (imageBuffer) => {
    try {
        const model = await tf.loadLayersModel(process.env.TF_MODEL_PATH);

        const imageTensor = tf.node.decodeImage(imageBuffer, 3)
            .resizeNearestNeighbor([224, 224]) 
            .expandDims() 
            .div(tf.scalar(255)); 

        const predictions = model.predict(imageTensor);
        const output = predictions.dataSync(); 

        const labels = [
            'protein', 
            'carbs', 
            'fat', 
            'vitamin'];
        const results = labels.reduce((acc, label, idx) => {
            acc[label] = `${output[idx].toFixed(2)}g`;
            return acc;
        }, {});

        return results;
    } catch (error) {
        throw new Error(`TensorFlow prediction failed: ${error.message}`);
    }
};

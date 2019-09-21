module.exports = {
    publicPath:'/HUHO',//修改静态资源路径
    devServer:{
        proxy:{
            '/api':{
                target:'http://39.97.33.178',
                changeOrigin:true
            }
        }
    }
}
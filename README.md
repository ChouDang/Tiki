# Tiki_Microservice - Đặng Hoài Trọng

- Link Deploy: [http://ec2-3-1-25-38.ap-southeast-1.compute.amazonaws.com:3000/](http://ec2-3-1-25-38.ap-southeast-1.compute.amazonaws.com:3000/)
- db_tiki.dump để backup nếu cần 
- logstash.conf config ELK

## CI/CD & Deploy
- GitHub Actions: Thiết lập pipeline tự động build & deploy lên EC2.
- EC2: t3.medium thêm 25GB và config kết nối EC2 với SG
- EC2 Deployment: Github Action => SSH EC2 => Test, Build => Run Docker trên EC2
- Monitor: AWS Console (Ram, CPU), ELK 

## Tech
- Microservice with NestJS
- ELK stack 
- RabbitMQ
- Redis
- PostgresQL

## Service 
- api-gateway
- identity-service
- notification-service
- payment-service
- product-service

## Feature
- Đăng nhập, đăng ký, JWT
- Redis lưu cache categories, restaurants => tối ưu Get với cache
- ELK stack thu thập log các service vào index:service-logs-%{+YYYY.MM.dd}
- đồng bộ Elastic table (restaurants, product) đã config trong logstash.conf
- Tìm kiếm với elasticsearch danh sách  restaurants theo categories ( phân trang, search (product.name, restaurant.name)) 
- Tối ưu elasticsearch và redis với 1 số tìm kiếm thường dùng
- Xem chi tiết Product với thông tin cửa hàng và các Product khác của cửa hàng
- Giỏ hàng có thể thêm nhiều product thanh toán 1 lần  
- Thanh toán gửi email xác nhận sau đó tự trừ tồn kho và ra đơn orders và liên kết bằng order_product sau đó 10s sẽ gửi email giao hàng thành công

##  PostgreSQL Relation Table 
- categories - foods: 1-n (1 danh mục có nhiều món ăn).
- restaurants - foods: 1-n (1 nhà hàng có nhiều món ăn).
- orders - order_food: 1-n (1 đơn hàng có nhiều món ăn).
- users - orders: 1-n (1 người dùng có nhiều đơn hàng).
- products - order_product: n-n (Nhiều món ăn có thể nằm trong nhiều đơn hàng).

## API: 
- **User**: login, đăng ký, CRUD user 	
- **Categories**: CRUD categories 
- **Restaurant**: CRUD restaurant 
  - Thêm sản phẩm vào vào cửa hàng 			
- **Foods**: CRUD product 
- **Payment**: 
  - Auth JWT			
  - CRUD order
  - Tạo đơn hàng 

import UserLayout from '~/layouts/UserLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from '~/components/Breakcrumbs';
import './Policy.scss';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

function Policy() {
  const routes = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '' },
  ];

  return (
    <UserLayout>
      <Container disableGutters maxWidth={false} className="container">
        <CustomBreadcrumbs routes={routes} />
        <main className="page-main">
          <Box className="policy">
            <Box className="side-bar">
              <ul className="nav-items">
                <li className="nav-item">
                  <Link to="/introduce">
                    <strong>Giới thiệu</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact">
                    <strong>Liên hệ</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/policy" className="active">
                    <strong>Chính sách</strong>
                  </Link>
                </li>
              </ul>
            </Box>
            <Box className="column-main">
              <h2>Chính Sách Và Quy Định Chung</h2>
              <Typography sx={{ mb: 1 }}>
                Vui lòng đọc kỹ nội dung của Điều Khoản và Điều Kiện này trước khi sử dụng dịch vụ mua hàng trực tuyến
                của trang web này. Bằng việc sử dụng dịch vụ trực tuyến này, bạn đồng ý rằng bạn đã đọc và chấp thuận bị
                ràng buộc bởi các Điều Khoản và Điều Kiện này.
              </Typography>
              <h4>Quy định chung</h4>
              <ol>
                <li>
                  Trong Điều Khoản và Điều Kiện này, các thuật ngữ sẽ có ý nghĩa như sau:
                  <p>
                    a. “Khách Hàng” hoặc “bạn” có nghĩa là bạn và tất cả những ai đặt hàng để mua Sản Phẩm trên trang
                    web này bằng việc đăng nhập vào trang web.
                  </p>
                  <p> b. “Orange” hoặc “chúng tôi” có nghĩa là người bán các Sản Phẩm thông qua Orange EShop.</p>
                  <p>
                    c. “Orange EShop” có nghĩa là phương tiện mà theo đó Sản Phẩm được bán cho khách hàng bởi Orange
                    thông qua trang web: Orange.com.vn.
                  </p>
                  <p>
                    d. “Sở Hữu Trí Tuệ” có nghĩa là các phát minh, tác phẩm văn học, nghệ thuật, biểu tượng, tên, hình
                    ảnh, và thiết kế mà theo đó các quyền sở hữu trí tuệ được công nhận, bao gồm (nhưng không giới hạn)
                    bản quyền, thiết kế, nhãn hiệu hoặc bản quyền, tên thương mại, nhận diện thương mại, bí mật thương
                    mại, nhãn hiệu dịch vụ, và các quyền tài sản khác (bất kể có được đăng ký hoặc có thể đăng ký bằng
                    bất kỳ phương tiện nào hay không), và quyền nộp đơn đăng ký và bảo hộ đối với bất kỳ đối tượng nào
                    nói trên.
                  </p>
                  <p>
                    e. “Đăng Nhập” có nghĩa là tên truy cập của Khách Hàng trên Orange EShop bằng thông tin đăng ký của
                    Khách Hàng đó.
                  </p>
                  <p>
                    f. “Đơn Đặt Hàng” có nghĩa là đơn đặt hàng do bạn gửi đi để mua Sản Phẩm từ Orange EShop bằng việc
                    Đăng Nhập của bạn.
                  </p>
                  <p>g. Sản Phẩm có nghĩa là bất kỳ và tất cả các sản phẩm được bán bởi Orange EShop.</p>
                  <p>
                    h. Điều Khoản và Điều Kiện có nghĩa là các điều khoản và điều kiện quy định tại đây bao gồm cả những
                    sửa đổi, bổ sung đối với các điều khoản và điều kiện này tại từng thời điểm.
                  </p>
                </li>
                <li>
                  Việc bán các Sản Phẩm bởi Orange thông qua trang web này sẽ tuân theo quy định của các Điều Khoản và
                  Điều Kiện này. Bằng việc gửi Đơn Đặt Hàng để Orange EShop xử lý, bạn xác nhận rằng bạn đã đọc, hiểu,
                  và đồng ý với toàn bộ Điều Khoản và Điều Kiện dưới hình thức mà các Điều Khoản và Điều Kiện xuất hiện
                  tại thời điểm Đơn Đặt Hàng của bạn được gửi đi để xử lý.
                </li>
                <li>
                  Khách Hàng đồng ý sẽ hoàn tất quy trình đăng ký theo yêu cầu của Orange thể hiện tại trang web/ứng
                  dụng này. Khách Hàng sẽ cung cấp cho Orange thông tin hoàn chỉnh và cập nhật mới nhất, bao gồm (nhưng
                  không giới hạn) tên, địa chỉ, số điện thoại, và địa chỉ email của Khách Hàng. Nếu Khách Hàng cung cấp
                  cho Orange bất kỳ thông tin nào không đúng, không chính xác, không cập nhật, hoặc không hoàn chỉnh
                  (hoặc sẽ trở thành thông tin không đúng, không chính xác, không cập nhật, hoặc không hoàn chỉnh),
                  Orange có quyền ngưng hoặc chấm dứt việc đăng ký của Khách Hàng đó và/hoặc từ chối việc sử dụng trang
                  web này trong hiện tại hoặc tương lai của Khách Hàng đó.
                </li>
                <li>
                  Bất kỳ công dân nào từ 16 tuổi trở lên đang cư trú tại Việt Nam đều có thể đăng ký tài khoản trên
                  Orange EShop. Orange có quyền từ chối hồ sơ đăng ký và chấm dứt việc đăng ký của bất kỳ Khách Hàng nào
                  vì bất kỳ lý do gì. Một khi Khách Hàng hoàn tất và gửi thông tin đăng ký, việc này sẽ được xem là
                  Khách Hàng đã lựa chọn nhận email và tin nhắn quảng cáo từ chúng tôi.
                </li>
                <li>
                  Khách Hàng sẽ chịu trách nhiệm đối với tất cả các Đơn Đặt Hàng được tạo dưới thông tin Đăng Nhập của
                  Khách Hàng và đồng ý bồi thường cho Orange đối với tất cả các yêu cầu bồi thường, các khoản bồi thường
                  do bên thứ ba yêu cầu phát sinh từ hành động đặt hàng của bất kỳ người nào dưới thông tin Đăng Nhập
                  của Khách Hàng. Khách Hàng có trách nhiệm cập nhật thông tin đăng ký của mình. Khách Hàng sẽ thông báo
                  ngay lập tức cho Orange trong trường hợp có sự sử dụng trái phép tài khoản Đăng Nhập của Khách Hàng.
                </li>
                <li>
                  Khách Hàng có thể đặt hàng thông qua trang web này. Sau khi đặt hàng, Khách Hàng sẽ nhận được email
                  xác nhận hệ thống đã nhận Đơn Đặt Hàng. Để làm rõ, email xác nhận này không phải là xác nhận chấp
                  thuận Đơn Đặt Hàng và không đảm bảo rằng các Sản Phẩm mà Khách Hàng đã đặt vẫn còn hàng. Việc một Sản
                  Phẩm hoặc dịch vụ nào đó được hiển thị trên trang web tại một thời điểm cụ thể không có nghĩa là Sản
                  Phẩm hoặc dịch vụ đó vẫn luôn có sẵn tại mọi thời điểm. Nếu không còn đủ hàng trong kho, chúng tôi
                  buộc phải hủy Đơn Đặt Hàng và sẽ thông báo cho bạn qua điện thoại hoặc email. Chúng tôi sẽ không có
                  nghĩa vụ cung cấp Sản Phẩm cho Khách Hàng cho đến khi chúng tôi chấp thuận Đơn Đặt Hàng bằng việc gửi
                  một email tiếp theo để xác nhận sự chấp thuận của chúng tôi đối với Đơn Đặt Hàng của Khách Hàng.
                </li>
                <li>
                  Orange sẽ nỗ lực để đáp ứng Đơn Đặt Hàng mà Khách Hàng đã đặt thông qua Orange EShop. Tuy nhiên,
                  Orange sẽ không chịu trách nhiệm trong trường hợp Orange từ chối toàn bộ hoặc một phần của Đơn Đặt
                  Hàng vì bất kỳ lý do nào, bao gồm nhưng không giới hạn những thay đổi không thể thấy trước được đối
                  với Sản Phẩm (tùy từng trường hợp) hoặc do Sản Phẩm không có sẵn.
                </li>
                <li>
                  Việc truy cập vào Orange EShop được thực hiện thông qua sử dụng mật khẩu cá nhân. Khách Hàng có nghĩa
                  vụ bảo mật mật khẩu này nhằm tránh hành vi sử dụng trái phép. Khách Hàng đồng ý chấp nhận mọi trách
                  nhiệm đối với mọi hoạt động phát sinh dưới tài khoản và mật khẩu Đăng Nhập của Khách Hàng. Orange sẽ
                  nỗ lực để ngăn chặn hành vi xâm nhập trái phép vào Orange EShop. Tuy nhiên, Orange sẽ không chịu trách
                  nhiệm đối với bất kỳ mất mát, thiệt hại nào phát sinh do bên thứ ba xâm nhập trái phép vào trang web
                  của Orange.
                </li>
                <li>
                  Tất cả hình ảnh của Sản Phẩm hiển thị trên trang web này chỉ cho mục đích minh họa nhằm giúp Khách
                  Hàng dễ nhận diện Sản Phẩm. Kích thước và màu sắc thật của Sản Phẩm có thể có khác biệt và các thông
                  số này không được phản ánh chính xác trên vỏ bọc đóng gói Sản Phẩm mà Khách Hàng nhận được do việc
                  điều chỉnh và cải thiện đóng gói Sản Phẩm.
                </li>
                <li>
                  Chuyển rủi ro: Tất cả rủi ro đối với Sản Phẩm sẽ chuyển sang cho Khách Hàng tại thời điểm giao hàng
                  đến địa chỉ giao hàng của Khách Hàng. Tuy nhiên quyền sở hữu đối với Sản Phẩm vẫn thuộc về Orange cho
                  đến khi việc thanh toán cho Sản Phẩm được hoàn tất.
                </li>
                <li>
                  Trách nhiệm:
                  <p>
                    a. Trách nhiệm của Orange dù là theo hợp đồng, ngoài hợp đồng, bồi thường cho bất kỳ thiệt hại, mất
                    mát, tổn thất phát sinh trực tiếp hoặc gián tiếp từ khiếm khuyết hoặc không tuân thủ của Sản Phẩm
                    hoặc bất kỳ vi phạm nghĩa vụ nào của Orange trong bất kỳ trường hợp nào sẽ không vượt quá giá trị
                    của Sản Phẩm.
                  </p>
                  <p>
                    b. Đối với các quyền mà Khách Hàng có được theo quy định của luật bảo vệ người tiêu dùng và trong
                    giới hạn luật định, Orange, công ty mẹ, công ty con, công ty liên kết hoặc công ty kế thừa của
                    Orange hoặc người điều hành, giám đốc, nhân viên, đại lý, đại diện, nhà thầu, nhà cung cấp của các
                    công ty này sẽ không phải chịu trách nhiệm đối với Khách Hàng hoặc bất kỳ cá nhân nào đối với bất kỳ
                    thiệt hại, mất mát mang tính hệ quả, gián tiếp, đặc biệt nào.
                  </p>
                  <p>
                    c. Khách Hàng đảm bảo sẽ không sử dụng Sản Phẩm cho các mục đích không phù hợp và sẽ chịu trách
                    nhiệm sử dụng các kỹ năng và sự cẩn trọng cần thiết khi sử dụng Sản Phẩm. Khách Hàng xác nhận và
                    đồng ý rằng Orange sẽ không phải chịu trách nhiệm đối với những nội dung tư vấn hoặc thông tin liên
                    quan đến Sản Phẩm và Orange sẽ không phải chịu trách nhiệm về việc thông tin này không chính xác
                    hoặc diễn đạt không đúng.
                  </p>
                </li>
              </ol>
            </Box>
          </Box>
        </main>
      </Container>
    </UserLayout>
  );
}

export default Policy;

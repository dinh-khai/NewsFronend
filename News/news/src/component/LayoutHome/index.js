import Header from '~/layout/Header';
import Footer from '~/layout/Footer';
import SideBar from '~/layout/SideBar';
import HeadContainer from '~/layout/HeadContainer';
import styles from './LayoutHome.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);
function LayoutHome({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <div className="grid">
                    <div>
                        <HeadContainer />
                    </div>
                    <div className={cx('content')}>
                        <div className="grid__row">
                            <div className="grid__col-8">{children}</div>
                            <div className="grid__col-4">
                                 <SideBar margin/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LayoutHome;


import Header from '~/layout/Header';
import SideBar from '~/layout/SideBar';

function LayoutTopic({ children }) {
    return (
        <div>  
            <Header />
            <div className="grid">
                <div>
                    <div className="grid__row">
                        <div className="grid__col-8">{children}</div>
                        <div className="grid__col-4">
                                <SideBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutTopic;

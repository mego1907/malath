import { Routes, Route } from "react-router-dom";
// import BlogCreate from "../pages/Admin/Blog/Create";
// import BlogEdit from "../pages/Admin/Blog/Edit";
// import BlogList from "../pages/Admin/Blog/List";
// import BlogSingle from "../pages/Admin/Blog/Single";
import FaqCreate from "../pages/Admin/Faq/Create";
import FaqEdit from "../pages/Admin/Faq/Edit";
import FaqList from "../pages/Admin/Faq/List";
import Login from "../pages/Admin/Login";
import PageList from "../pages/Admin/page/List";
import PageNotFound from "../pages/Admin/PageNotFound";
import SessionsList from "../pages/Admin/Sessions/List";
// import UsersCreate from "../pages/Admin/Users/Create";
// import UsersList from "../pages/Admin/Users/List";
import WalletList from "../pages/Admin/Wallet/List";
import Home from "../pages/website/Home";
import PrivateRoutes from "./ProtectedRoute";
import NotificationsCreate from "../pages/Admin/Notifications/Create";
import NotificationsLists from "../pages/Admin/Notifications/Lists";
import BeneficiaryUsersList from "../pages/Admin/Users/Beneficiary/List";
import BeneficiaryUsersCreate from "../pages/Admin/Users/Beneficiary/Create";
import AdviserUsersList from "../pages/Admin/Users/Adviser/List";
import AdviserUsersCreate from "../pages/Admin/Users/Adviser/Create";
import SocialMediaLists from "../pages/Admin/SocialMedia/Lists";
import SocialMediaCreate from "../pages/Admin/SocialMedia/Create";
import SocialMediaEdit from "../pages/Admin/SocialMedia/Edit";
// import BeneficiaryUsersUpdate from "../pages/Admin/Users/Beneficiary/Edit";
// import AdviserUsersEdit from "../pages/Admin/Users/Adviser/Edit";
import ManagementUsersList from "../pages/Admin/Users/Management/List";
import ManagementUsersCreate from "../pages/Admin/Users/Management/Create";
import Dashboard from "../pages/Admin/Dashboard";
import FieldsList from "../pages/Admin/Fields/List";
import UserActivationList from "../pages/Admin/UserActivation/List";
// import HomeBlogSingle from "../pages/website/BlogSingle";
import UsersDetails from "../pages/Admin/Users/Details";
import MessagesList from "../pages/Admin/Messages/List";
import MessagesDetails from "../pages/Admin/Messages/Details";
import SubCategories from "../pages/Admin/Fields/SubCategories";
import ActivationDetails from "../pages/Admin/UserActivation/Details";
import CommentList from "../pages/Admin/Comments/Lists";
import Financial from "../pages/Admin/Wallet/Financial";
import UsersActivity from "../pages/Admin/UsersActivity/List";
import SessionPrice from "../pages/Admin/SessionPrice/Create";
import LecturesList from "../pages/Admin/Lectures/List";
import LecturesCreate from "../pages/Admin/Lectures/Create";
import DiscountCouponList from "../pages/Admin/CouponDiscount/List";
import DiscountCouponCreate from "../pages/Admin/CouponDiscount/Create";
// import BeneficiaryUsersUpdate from "../pages/Admin/Users/Beneficiary/Edit";
// import MessagesList from "../pages/Admin/Messages/List";
// import ManagementUsersEdit from "../pages/Admin/Users/Management/Edit";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      {/* <Route path="/blog/:id" element={<HomeBlogSingle />}></Route> */}
      <Route path="/admin/login" element={<Login />}></Route>
      <Route element={<PrivateRoutes/>}>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        {/* Start users */}
        <Route path="/admin/adviser/users" element={<AdviserUsersList />}></Route>
        <Route path="/admin/adviser/users/create" element={<AdviserUsersCreate />}></Route>
        <Route path="/admin/adviser/users/:id/edit" element={<AdviserUsersCreate />}></Route>

        <Route path="/admin/beneficiary/users" element={<BeneficiaryUsersList />}></Route>
        <Route path="/admin/beneficiary/users/create" element={<BeneficiaryUsersCreate />}></Route>
        <Route path="/admin/beneficiary/users/:id/edit" element={<BeneficiaryUsersCreate />}></Route>


        <Route path="/admin/management/users" element={<ManagementUsersList />}></Route>
        <Route path="/admin/management/users/create" element={<ManagementUsersCreate />}></Route>
        <Route path="/admin/management/users/:id/edit" element={<ManagementUsersCreate />}></Route>
        
        
        <Route path="/admin/users/:id/show" element={<UsersDetails />}></Route>
        
        {/* End users */}
        {/* Start Sessions */}
        <Route path="/admin/sessions" element={<SessionsList />}></Route>
        {/* End Sessions */}
        {/* Start Lectures */}
        <Route path="/admin/lectures" element={<LecturesList />}></Route>
        <Route path="/admin/lectures/create" element={<LecturesCreate />}></Route>
        <Route path="/admin/lectures/:id/edit" element={<LecturesCreate />}></Route>
        {/* END Lectures */}
        {/* Start Wallet */}
        <Route path="/admin/wallet" element={<WalletList />}></Route>
        <Route path="/admin/financial" element={<Financial />}></Route>
        {/* End Wallet */}
        {/* Start Wallet */}
        <Route path="/admin/notifications" element={<NotificationsLists />}></Route>
        <Route path="/admin/notifications/create" element={<NotificationsCreate />}></Route>
        {/* End Wallet */}
        {/* Start Wallet */}
        <Route path="/admin/social-media" element={<SocialMediaLists />}></Route>
        <Route path="/admin/social-media/create" element={<SocialMediaCreate />}></Route> 
        <Route path="/admin/social-media/:id/edit" element={<SocialMediaEdit />}></Route> 
        {/* End Wallet */}
        {/* Start Blog */}
        {/* <Route path="/admin/blogs" element={<BlogList />}></Route>
        <Route path="/admin/blog/create" element={<BlogCreate />}></Route>
        <Route path="/admin/blog/view/:id" element={<BlogSingle />}></Route>
        <Route path="/admin/blog/edit/:id" element={<BlogEdit />}></Route> */}
        {/* End Blog */}
        {/* Start Faq */}   
        <Route path="/admin/faq" element={<FaqList />}></Route>
        <Route path="/admin/faq/create" element={<FaqCreate />}></Route>
        <Route path="/admin/faq/edit/:id" element={<FaqEdit />}></Route>
        {/* End Faq */}

        {/* Start message */}   
        <Route path="/admin/:typeMessage" element={<MessagesList />}></Route>
        <Route path="/admin/message/:id/show" element={<MessagesDetails />}></Route>
        {/* End message */}

        {/* Start fields */}   
        <Route path="/admin/fields" element={<FieldsList />}></Route>
        <Route path="/admin/fields/:id/sub_categories" element={<SubCategories />}></Route>
        {/* <Route path="/admin/faq/create" element={<FaqCreate />}></Route>
        <Route path="/admin/faq/edit/:id" element={<FaqEdit />}></Route> */}
        {/* End fields */}

        <Route path="/admin/user-activation" element={<UserActivationList />}></Route>
        <Route path="/admin/user-activation/:id/show" element={<ActivationDetails />}></Route>


        <Route path="/admin/comments" element={<CommentList />}></Route>


        <Route path="/admin/users-activity" element={<UsersActivity />}></Route>


        <Route path="/admin/session-price" element={<SessionPrice />}></Route>

        {/* Start DiscountCoupon */}
        <Route path="/admin/coupons" element={<DiscountCouponList />}></Route>
        <Route path="/admin/coupons/create" element={<DiscountCouponCreate />}></Route>
        <Route path="/admin/coupons/:id/edit" element={<DiscountCouponCreate />}></Route>
        {/* END DiscountCoupon */}

        <Route path="/admin/page/:type" element={<PageList />}></Route>
        <Route path="pageNotFound" element={<PageNotFound />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Route>
    </Routes>
  );
};

export default Routers;

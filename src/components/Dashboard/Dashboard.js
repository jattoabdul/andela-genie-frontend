import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { Navigation } from '../Partials/Navigation';
import { ModalContainer } from '../Partials/ModalContainer';
import { Footer } from '../Partials/Footer';
import { Pagination } from '../Partials/Pagination';
import {
    InputGroup,
    Input,
    Label
} from 'reactstrap';
import {
    fetchAllRequests,
    handleUpdateRequest,
    setSelectedStatus
  } from '../../actions/requestAction';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavDropdownOpen: false,
            isModalOpen: false,
            actionName: '',
            requestPerPage: 10,
            currentPage: 1,
            filterText: '',
            currentStatus: '',
            status: '',
            updateMsg: '',
            singleRequest: {},
            isSearching: false,
        };
    }

    toggleHamburgerNav = () => {
        this.setState({
            isNavDropdownOpen: !this.state.isNavDropdownOpen
        });
    }

    toggle = (action='', request={}) => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            actionName: action,
            singleRequest: request
          });
    }

    handleOnChange = (event) => {
        const { target: { name, value } } = event;
        this.setState((state) => ({ ...state, [name]: value }));
    }

    handleOnCheckBox = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }

    handleOnSelectStatus = (event) => {
        const { target: { value} } = event;
        this.setState({ currentStatus: value,  isSearching: true });
        this.props.setSelectedStatus(value);
    }

    updateRequestAction = () => {
        let { singleRequest: { id }, updateMsg, status } = this.state;
        this.props.handleUpdateRequest(id, status, updateMsg);
        this.toggle('');
    }

    handlePageClick = (page) => {
        const selectedPage = Math.ceil(page.selected + 1);
        this.setState({
            currentPage: Number(selectedPage)
        });
    }

    handleOnChangeNoPerPage = (event) => {
        this.setState({
            requestPerPage: Number(event.target.value)
        });
    }

    handleOnChangeFilterText = (event) => {
        this.setState({
            filterText: event.target.value,
            isSearching: true
        });
    }

    handleRefresh = () => {
        this.props.fetchAllRequests();
    }

    componentDidMount() {
        this.props.fetchAllRequests();
        this.props.setSelectedStatus();
        this.interval = setInterval(this.handleRefresh, 180000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { requestReducer: { requests, isFetchingRequest, meta } } = this.props;
        const { currentPage, requestPerPage, isSearching, updateMsg, currentStatus, status, filterText  } = this.state;
        const indexOfLastRequest = currentPage * requestPerPage;
        const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
        const filteredResults = requests.filter(request => {
          if (!currentStatus){
            return request.user.firstName.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
          }
          return String(request.status) === currentStatus && request.user.firstName.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
        });
        const allFilteredRequests = isSearching ?  filteredResults: requests;
        const currentRequests = allFilteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
        let totalPages = Math.ceil((allFilteredRequests.length)/(requestPerPage));

        const renderRequests = currentRequests.map((request, index) => {
            return (<tr id={request.id} key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{request.item}</td>
                    <td>{request.qty}</td>
                    <td>{request.info}</td>
                    <td>{request.user.firstName} {request.user.lastName}</td>
                    <td>{request.statusText}</td>
                    <td>{request.timestamps.createdAt.datePrettyShort}</td>
                    <td>
                        <span className="edit-icon add-tag-no" onClick={() => this.toggle('Update Request', request)}></span>
                    </td>
                </tr>);
          });

        return [
            <div className="Dashboard">
                <div className="navigation-container">
                    <Navigation
                        isOpen={this.state.isNavDropdownOpen}
                        toggle={this.toggleHamburgerNav}
                    />
                </div>
                <div className="guest-list-container">
                    <div className="guest-list-top-section">
                        <div className="guest-list-table-title">
                            <span className="table-title-text">Today's Requests</span>
                            <div className="line">
                                <span className="long-line"></span>
                                <span className="short-line"></span>
                            </div>
                        </div>
                        <div className="add-guest-container">
                            <div className="refresh-guest-btn" onClick={this.handleRefresh}>
                                <span>Refresh</span>
                                {isFetchingRequest ? <div className="loader absolute"></div> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="guest-list-table-section">
                        <div className="table-filters">
                            <InputGroup className="search-filter">
                                <Label for="search">Filter by Name:</Label>
                                <Input placeholder="search" name="search" id="search" onChange={this.handleOnChangeFilterText} />
                            </InputGroup>
                            <InputGroup className="no-of-record-filter">
                                <Label for="no_of_record">No. of Records:</Label>
                                <Input type="select" name="select" id="no_of_record" value={this.state.requestPerPage} onChange={this.handleOnChangeNoPerPage}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value={meta.total_rows || "1000"}>All</option>
                                </Input>
                            </InputGroup>

                            <InputGroup className="location-filter">
                                <Label for="current-location">Filter by Status:</Label>
                                <Input type="select" name="select" id="current-location" value={currentStatus} onChange={this.handleOnSelectStatus}>
                                <option id="lagos" value='0'>Received</option>
                                <option id="new-york" value="1">In Progress</option>
                                <option id="san-francisco" value="2">Resolved</option>
                                <option id="nairobi" value="">All</option>
                                </Input>
                            </InputGroup>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Info</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Status </th>
                                    <th scope="col">TimeStamp</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(parseInt(currentRequests.length, 10) === 0 ? <tr><td align="center" colSpan="10">No Guest Records</td></tr> : renderRequests)}
                            </tbody>
                        </table>
                        {(
                            parseInt(currentRequests.length, 10) === 0 ?
                            '' :
                            <Pagination
                                handlePageClick={this.handlePageClick}
                                pageCount={parseInt(totalPages, 10)}
                            />
                        )}
                    </div>
                    <ModalContainer
                      isModalOpen={this.state.isModalOpen}
                      toggle={this.toggle}
                      actionName={this.state.actionName}
                      status={status}
                      updateRequestAction={this.updateRequestAction}
                      onChange={this.handleOnChange}
                      requestMsg={updateMsg}
                    />
                </div>
            </div>,
            <Footer />
        ];
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = {
    fetchAllRequests,
    handleUpdateRequest,
    setSelectedStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

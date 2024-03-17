
import React from 'react';
import { BACK, FIRST, LAST, NEXT } from '../constant/GeneralConstant';

const PaginationComponent = (props) => {
    const { first, last, number, totalPages, onClickPagination } = props;
    return (

        <div className="float-right" style={{ fontSize: "10px" }}  >
            <nav aria-label="..." >
                <ul className="pagination">
                    {first === false ?
                        <li className="page-item ">
                            <button
                                type="button"
                                onClick={(e) => onClickPagination(e, BACK)}
                                className="page-link"
                                href="#"
                                tabIndex="-1"
                            >Önceki
                            </button>
                        </li>
                        :
                        <li className="page-item disabled">
                            <button type="button" className="page-link" href="#" tabIndex="-1">Önceki</button>
                        </li>
                    }
                    {number + 1 > 2 &&
                        <>
                            <li className="page-item">
                                <button onClick={(e) => onClickPagination(e, FIRST)} className="page-link" href="#">1</button>
                            </li>
                            {number + 1 > 3 && <li className="page-item disabled"><a className="page-link">....</a></li>}
                        </>
                    }
                    {number + 1 > 1 &&
                        <li className="page-item ">
                            <button
                                onClick={(e) => onClickPagination(e, BACK)}
                                className="page-link"
                                href="#">
                                {number} <span className="sr-only">(current)</span>
                            </button>
                        </li>
                    }
                    <li className="page-item active">
                        <button className="page-link" href="#">
                            {number + 1} <span className="sr-only">(current)</span>
                        </button>
                    </li>
                    {number + 2 <= totalPages &&
                        <li className="page-item ">
                            <button
                                onClick={(e) => onClickPagination(e, NEXT)}
                                className="page-link" href="#"
                            >{number + 2} <span className="sr-only">(current)</span>
                            </button>
                        </li>
                    }
                    {number + 2 < totalPages &&
                        <>
                            {number + 3 < totalPages && <li className="page-item disabled"><a className="page-link">....</a></li>}
                            <li className="page-item">
                                <button
                                    onClick={(e) => onClickPagination(e, LAST)}
                                    className="page-link" href="#"
                                >{totalPages}
                                </button>
                            </li>
                        </>
                    }
                    {last === false ?
                        <li className="page-item">
                            <button
                                onClick={(e) => onClickPagination(e, NEXT)}
                                className="page-link" href="#"
                            >Sonraki
                            </button>
                        </li>
                        :
                        <li className="page-item disabled">
                            <button type="button" className="page-link" href="#">Sonraki</button>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default PaginationComponent;
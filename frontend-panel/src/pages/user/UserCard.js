

import React, { useState } from 'react'

const UserCard = (props) => {
    //const [user, setUser] = useState(props);

    const { roles, user } = props;
    const { username, name, surname, email, role, tcNo, motherName, fatherName, bloodType, bornDate, phoneNumber, createdDate } = user;
    // setUserName(props.name);

    return (
        <div className="col-lg-12  mt-0">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">{props.title ? props.title : "Hesap Bilgilerim"}</h5>
                </div>
                <table className="table table-sm  table-striped">
                    <tbody>
                        <tr>
                            <td><b>Üye Adı :</b></td><td>{username}</td>
                        </tr>
                        <tr>
                            <td><b>İsim :</b></td><td>{name}</td>
                        </tr>
                        <tr>
                            <td><b>Soyisim :</b></td><td>{surname}</td>
                        </tr>
                        <tr>
                            <td><b>Email :</b></td><td>{email}</td>
                        </tr>
                        <tr>
                            <td><b>Role : </b></td><td>{roles && roles.map((singleRole, index) => singleRole.role === role && singleRole.value)} </td>
                        </tr>
                        <tr>
                            <td><b>TC NO :</b></td><td>{tcNo}</td>
                        </tr>
                        <tr>
                            <td><b>Anne Adı :</b></td><td>{motherName}</td>
                        </tr>
                        <tr>
                            <td><b>Baba Adı :</b></td><td>{fatherName}</td>
                        </tr>
                        <tr>
                            <td><b>Telefon No :</b></td><td>{phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><b>Doğum Tarihi :</b></td><td>{bornDate}</td>
                        </tr>
                        <tr>
                            <td><b>Kan Grubu :</b></td><td>{bloodType}</td>
                        </tr>
                        <tr>

                            <td><b>Kayıt Tarihi :</b></td><td>{createdDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default UserCard;





//
//  Product.swift
//  mobile
//
//  Created by Иван Тазенков on 13.12.2022.
//

import Foundation
struct Product: Identifiable, Codable, Hashable {
    let id: Int
    let name: String?
    let brand: String?
    let type: String?
    let price: Int?
    let strength: Int?
}

//
//  DetailViewModel.swift
//  mobile
//
//  Created by Иван Тазенков on 13.12.2022.
//

import Foundation
final class DetailViewModel: ObservableObject {
    @Published var product: Product

    init(product: Product) {
        self.product = product
    }
//
//    func obtainProducts() {
//        for i in 0...5 {
//            products.append(Product(id: i, name: "\(i)", brand: "\(i)", type: "\(i)", price: i, strength: i))
//        }
//    }
}

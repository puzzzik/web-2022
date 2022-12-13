//
//  ListViewModel.swift
//  mobile
//
//  Created by Иван Тазенков on 13.12.2022.
//

import Foundation
final class ListViewModel: ObservableObject {
    @Published var products: [Product] = [Product]()
    private let networkService = NetworkService.shared

    init() {
        obtainProducts()
    }

    func obtainProducts() {

        networkService.getProducts { result in
            switch result {
            case .success(let products):
                self.products = products
            case .failure(_):
                self.products = [Product]()
            }
        }
    }
}
